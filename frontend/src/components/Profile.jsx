import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCreateTag } from "../api/fetchCreateTag";
import { fetchPasswordUpdate } from "../api/fetchPasswordUpdate";
import { fetchProfile } from "../api/fetchProfile";
import { fetchRemoveTag } from "../api/fetchRemoveTag";
import { fetchTags } from "../api/fetchTags";
import { fetchUpdateTag } from "../api/fetchUpdateTag";
import { getAuth } from "../store/features/auth/selectors";
import { forbiddenInputChar } from "../utils/string";
import { UserProfileForm } from "./UserProfileForm";
import { UserPasswordForm } from "./UserPasswordForm";
import { UserTagsForm } from "./UserTagsForm";
import { UserHelpForm } from "./UserHelpForm";
import { UserAdminCreateAccountForm } from "./UserAdminCreateAccountForm";
import { fetchGenerateAccount } from "../api/fetchGenerateAccount";

export const Profile = () => {
  const [tagSelected, setTagSelected] = useState(null);
  const [tagNewValue, setTagNewValue] = useState("");
  const [userTags, setUserTags] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const auth = useSelector(getAuth);
  const editTagInputRef = useRef();
  // const [newPasssword, setNewPassword] = useState("");
  // const [newPasssword2, setNewPassword2] = useState("");
  // const [oldPasssword, setOldPassword] = useState("");
  const [passwordUpdateResponse, setPasswordUpdateResponse] = useState(null);
  const [passwordUpdateIsLoading, setPasswordUpdateIsLoading] = useState(false);

  const [createAccountResponse, setCreateAccountResponse] = useState(null);
  const [createAccountIsLoading, setCreateAccountIsLoading] = useState(false);

  const [tagBoxIsLoading, setTagBoxIsLoading] = useState(false);
  const [tagApiResponse, SetTagApiResponse] = useState(false);

  useEffect(() => {
    async function fetchRes() {
      let tags = await fetchTags();
      let profile = await fetchProfile();
      setUserProfile(profile.body);

      // We keep only user tags or all if admin
      let dataset = [];
      if (auth.isAdmin) {
        dataset = tags.body;
      } else if (!tags.error && !profile.error) {
        for (let tag of tags.body) {
          if (profile.is_admin || tag.user === profile.body.id) {
            dataset.push(tag);
          }
        }
      }
      setUserTags(dataset);
    }

    fetchRes();
  }, []);

  useEffect(() => {
    SetTagApiResponse(null);
  }, [tagNewValue]);

  const handleTagCreate = async (tagName) => {
    if (!tagName) {
      return;
    }

    const response = await fetchCreateTag(tagName);
    SetTagApiResponse(response);
    if (!response.error) {
      setTagNewValue("");
      const newTag = response.body;
      setUserTags([newTag, ...userTags]);
    }
  };

  const handleEditTagInputChange = (e) => {
    const value = e.target.value;
    const lastChar = value[value.length - 1];

    if (forbiddenInputChar.includes(lastChar)) {
      return;
    }

    setTagNewValue(value);
  };

  const handleCreateAccount = async (e, username) => {
    e.preventDefault();

    setCreateAccountIsLoading(true);
    setCreateAccountResponse(null);
    const response = await fetchGenerateAccount(username);
    setCreateAccountResponse(response);
    setCreateAccountIsLoading(false);
  };

  const handlePasswordUpdate = async (
    e,
    oldPassword,
    newPassword,
    newPassword2
  ) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setPasswordUpdateResponse({
        message: "New passwords are not equals",
        error: true,
      });
      return;
    }
    setPasswordUpdateIsLoading(true);
    let response = await fetchPasswordUpdate(oldPassword, newPassword);

    if (response.body?.hasOwnProperty("new_password")) {
      response["message"] = response.body.new_password[0];
    } else if (response.body?.hasOwnProperty("old_password")) {
      response["message"] = response.body.old_password[0];
    }

    setPasswordUpdateResponse(response);
    setPasswordUpdateIsLoading(false);
  };

  // const handleInvitation = async (e) => {
  //   e.preventDefault();
  //   setInvitationResponse(null);
  //   setInvitationIsLoading(true);
  //   const response = await fetchInvitation(invitationEmail);

  //   if (!response.error) {
  //     setInvitationEmail("");
  //   }

  //   setInvitationResponse(response);
  //   setInvitationIsLoading(false);
  // };

  const handleTagSelection = (tag) => {
    setTagNewValue(tag);
    setTagSelected(tag);
    editTagInputRef.current.focus();
  };

  const handleTagUpdate = async () => {
    if (!tagNewValue) {
      return;
    }

    if (tagSelected === tagNewValue) {
      SetTagApiResponse({
        body: { name: "Tag name is the same" },
        error: true,
      });
      return;
    }

    setTagBoxIsLoading(true);
    const response = await fetchUpdateTag(tagSelected, tagNewValue);
    SetTagApiResponse(response);

    if (response.error) {
      setTagBoxIsLoading(false);
      return;
    }
    const newTag = response;
    const updatedTags = userTags;
    const indexToUpdate = userTags.findIndex((tag) => tag.name === tagSelected);
    updatedTags[indexToUpdate] = newTag;
    setTagSelected(newTag.name);
    setUserTags([...updatedTags]);
    setTagBoxIsLoading(false);
  };

  const handleTagDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure ? Tag will be permanently deleted"
    );

    if (!confirmation) {
      return;
    }
    setTagBoxIsLoading(true);

    const response = await fetchRemoveTag(tagSelected);
    const updatedTags = userTags;
    const indexToDelete = userTags.findIndex((tag) => tag.name === tagSelected);
    updatedTags.splice(indexToDelete, 1);
    setTagNewValue("");
    setTagSelected(null);

    setUserTags([...updatedTags]);

    setTagBoxIsLoading(false);
  };

  return (
    <div className="profile">
      <div className="profile__boxes">
        <UserProfileForm userProfile={userProfile} />
        <UserPasswordForm
          handlePasswordUpdate={handlePasswordUpdate}
          passwordUpdateIsLoading={passwordUpdateIsLoading}
          passwordUpdateResponse={passwordUpdateResponse}
        />
        <UserTagsForm
          handleTagSelection={handleTagSelection}
          handleTagCreate={handleTagCreate}
          userTags={userTags}
          tagSelected={tagSelected}
          tagBoxIsLoading={tagBoxIsLoading}
          tagApiRespons={tagApiResponse}
          tagNewValue={tagNewValue}
          handleEditTagInputChange={handleEditTagInputChange}
          editTagInputRef={editTagInputRef}
          handleTagDelete={handleTagDelete}
          handleTagUpdate={handleTagUpdate}
        />

        {auth.isAdmin && (
          <UserAdminCreateAccountForm
            handleCreateAccount={handleCreateAccount}
            createAccountIsLoading={createAccountIsLoading}
            createAccountResponse={createAccountResponse}
          />
        )}
        <UserHelpForm />
      </div>
    </div>
  );
};
