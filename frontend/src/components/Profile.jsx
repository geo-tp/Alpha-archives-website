import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCreateTag } from "../api/fetchCreateTag";
import { fetchInvitation } from "../api/fetchInvitation";
import { fetchLogout } from "../api/fetchLogout";
import { fetchPasswordUpdate } from "../api/fetchPasswordUpdate";
import { fetchProfile } from "../api/fetchProfile";
import { fetchRemoveTag } from "../api/fetchRemoveTag";
import { fetchTags } from "../api/fetchTags";
import { fetchUpdateTag } from "../api/fetchUpdateTag";
import { getAuth } from "../store/features/auth/selectors";
import { ApiResponse } from "./ApiResponse";
import { FormLoading } from "./FormLoading";
import { TagSelector } from "./TagSelector";
import { forbiddenInputChar } from "../utils/string";

export const Profile = () => {
  const [tagSelected, setTagSelected] = useState(null);
  const [tagNewValue, setTagNewValue] = useState("");
  const [userTags, setUserTags] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const auth = useSelector(getAuth);
  const dispatch = useDispatch();
  const editTagInputRef = useRef();
  const [newPasssword, setNewPassword] = useState("");
  const [newPasssword2, setNewPassword2] = useState("");
  const [oldPasssword, setOldPassword] = useState("");
  const [passwordUpdateResponse, setPasswordUpdateResponse] = useState(null);
  const [passwordUpdateIsLoading, setPasswordUpdateIsLoading] = useState(false);

  const [invitationEmail, setInvitationEmail] = useState("");
  const [invitationResponse, setInvitationResponse] = useState(null);
  const [invitationIsLoading, setInvitationIsLoading] = useState(false);

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

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPasssword !== newPasssword2) {
      setPasswordUpdateResponse({
        message: "New passwords are not equals",
        error: true,
      });
      return;
    }
    setPasswordUpdateIsLoading(true);
    let response = await fetchPasswordUpdate(oldPasssword, newPasssword);

    if (response.body?.hasOwnProperty("new_password")) {
      response["message"] = response.body.new_password[0];
    } else if (response.body?.hasOwnProperty("old_password")) {
      response["message"] = response.body.old_password[0];
    }

    setPasswordUpdateResponse(response);
    setPasswordUpdateIsLoading(false);
  };

  const handleInvitation = async (e) => {
    e.preventDefault();
    setInvitationResponse(null);
    setInvitationIsLoading(true);
    const response = await fetchInvitation(invitationEmail);

    if (!response.error) {
      setInvitationEmail("");
    }

    setInvitationResponse(response);
    setInvitationIsLoading(false);
  };

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
        <div className="profile__box">
          <h2>
            User <i className="fa fa-bookmark"></i>
          </h2>
          {auth.isStaff && !auth.isAdmin && (
            <div className="profile__infos">
              <span>
                You are connected as <b>Contributor</b>.
              </span>
              <ul>
                <li>✓ Apply or remove tags on image</li>
                <li>✓ Create new tags</li>
                <li>✓ Edit or delete your own tags</li>
              </ul>
            </div>
          )}

          {auth.isAdmin && (
            <div className="profile__infos">
              <span>
                You are connected as <b>Administrator</b>.
              </span>
              <ul>
                <li>✓ Apply or remove tags on image</li>
                <li>✓ Create new tags</li>
                <li>✓ Edit or delete any tags</li>
                <li>✓ Invite new contributor</li>
              </ul>
            </div>
          )}

          <div className="profile__input-box">
            <label htmlFor="username-user">Username</label>

            <input
              className="profile__input-box__input"
              type="text"
              name="username-user"
              id="username-user"
              disabled={true}
              value={userProfile?.username}
            />
          </div>
          <div className="profile__input-box">
            <label htmlFor="email-user">Email</label>
            <input
              className="profile__input-box__input"
              type="email"
              name="email-user"
              id="email-user"
              value={userProfile?.email}
              disabled={true}
            />
          </div>
        </div>

        <form className="profile__box" onSubmit={handlePasswordUpdate}>
          <h2>
            Password <i className="fa fa-key"></i>
          </h2>
          <p className="profile__infos">Update your login password</p>
          <div className="profile__input-box">
            <label htmlFor="username-user">Old password</label>

            <input
              className="profile__input-box__input"
              type="password"
              name="old-password-user"
              id="old-password-user2"
              value={oldPasssword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="profile__input-box">
            <label htmlFor="new-password-user">New password</label>
            <input
              className="profile__input-box__input"
              type="password"
              name="new-password-user"
              id="new-password-user"
              value={newPasssword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="profile__input-box">
            <label htmlFor="new-password-user2">New password again</label>
            <input
              className="profile__input-box__input"
              type="password"
              name="new-password-user2"
              id="new-password-user2"
              value={newPasssword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
            />
          </div>
          <div className="profile__button-box">
            <button
              disabled={passwordUpdateIsLoading ? true : false}
              className="profile__button"
              type="submit"
            >
              Change
            </button>
            {passwordUpdateIsLoading && <FormLoading />}
          </div>
          {passwordUpdateResponse?.message && (
            <ApiResponse
              message={passwordUpdateResponse.message}
              isError={passwordUpdateResponse.error}
            />
          )}
        </form>
        <div className="profile__box">
          <h2>
            Tags <i className="fa fa-tag"></i>
          </h2>
          <p className="profile__infos">
            You can edit or remove your tags. Warning, if you delete a tag, it
            will be removed from all elements.
          </p>
          <div className="profile__tag-box">
            {userTags && (
              <TagSelector
                handleTagClick={handleTagSelection}
                handleTagCreateClick={handleTagCreate}
                tags={userTags}
                showOnFocus={false}
                tagSelected={tagSelected}
                isLoading={tagBoxIsLoading}
              />
            )}
            {!userTags?.length && <p>You don't have tags yet</p>}
            {tagApiResponse?.error && (
              <ApiResponse
                message={tagApiResponse?.body.name}
                isError={tagApiResponse.error}
              />
            )}
            <div className="profile__tag-box__edit">
              <input
                value={tagNewValue || ""}
                onChange={handleEditTagInputChange}
                className="profile__tag-box__edit__bar"
                type="text"
                placeholder="Select tag to use me"
                disabled={tagSelected ? false : true}
                ref={editTagInputRef}
              />
              <button
                disabled={tagSelected && !tagBoxIsLoading ? false : true}
                onClick={handleTagUpdate}
                className="profile__tag-box__edit__button profile__tag-box__edit__button--valid"
              >
                <i className="fa fa-check"></i>
              </button>
              <button
                onClick={handleTagDelete}
                disabled={tagSelected && !tagBoxIsLoading ? false : true}
                className="profile__tag-box__edit__button profile__tag-box__edit__button--erase"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        {auth.isAdmin && (
          <form className="profile__box" onSubmit={handleInvitation}>
            <h2>
              Invitation <i className="fa fa-envelope"></i>
            </h2>

            <p className="profile__infos">
              You can invite people to become contributor. That means they could
              add, edit, and delete tags on screenshots. New user will receive
              an email with crendentials to login.
            </p>
            <div className="profile__input-box">
              <label htmlFor="email-guest">New contributor email</label>
              <input
                className="profile__input-box__input"
                type="email"
                name="email-guest"
                id="email-guest"
                value={invitationEmail}
                onChange={(e) => setInvitationEmail(e.target.value)}
                required
              />
            </div>
            <div className="profile__button-box">
              <button
                disabled={invitationIsLoading ? true : false}
                className="profile__button"
                type="submit"
              >
                Send
              </button>
              {invitationIsLoading && <FormLoading />}
            </div>
            {invitationResponse?.message && (
              <ApiResponse
                message={invitationResponse.message}
                isError={invitationResponse.error}
              />
            )}
          </form>
        )}
        <div className="profile__box">
          <h2>
            Help <i className="fa fa-info"></i>
          </h2>
          <p className="profile__infos">
            For questions, you can contact Geo or Grender on{" "}
            <a href="https://discord.gg/RzBMAKU">Discord</a>. For bugs report,
            please post your issue here :{" "}
            <a href="https://github.com/geo-tp/Alpha-archives-website/issues">
              Github project of this website
            </a>
          </p>
          <p className="profile__infos">
            You can only use alpha numeric characters for tag creation, specials
            characters are not allowed. Here is the list of non alpha numeric
            char accepted : space, underscore and minus.
          </p>
          <p className="profile__infos">
            <Link to="/upload">Upload page</Link> filters screenshots to avoid
            100% exact duplicates. A screenshot with a small difference
            (watermark for example) will be accepted even if it's already into
            archive. You can check in depth with software like
            <a href="https://www.digikam.org/"> DigiKam (Linux)</a> or{" "}
            <a href="https://github.com/ermig1979/AntiDupl">
              Antidupl (Windows)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
