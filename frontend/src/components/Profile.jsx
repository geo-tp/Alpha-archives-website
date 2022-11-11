import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInvitation } from "../api/fetchInvitation";
import { fetchLogout } from "../api/fetchLogout";
import { fetchPasswordUpdate } from "../api/fetchPasswordUpdate";
import { fetchProfile } from "../api/fetchProfile";
import { fetchRemoveTag } from "../api/fetchRemoveTag";
import { fetchTags } from "../api/fetchTags";
import { fetchUpdateTag } from "../api/fetchUpdateTag";
import { getAuth } from "../store/features/auth/selectors";
import { ApiResponse } from "./ApiResponse";
import { TagSelector } from "./TagSelector";

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

  const [invitationEmail, setInvitationEmail] = useState("");
  const [invitationResponse, setInvitationResponse] = useState(null);

  useEffect(() => {
    async function fetchRes() {
      let tags = await fetchTags();
      setUserTags(tags.body);
      let profile = await fetchProfile();
      setUserProfile(profile.body);
    }

    fetchRes();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPasssword !== newPasssword2) {
      setPasswordUpdateResponse({
        message: "New passwords are not equals",
        error: true,
      });
    }

    let response = await fetchPasswordUpdate(oldPasssword, newPasssword);

    if (response.body?.hasOwnProperty("new_password")) {
      response["message"] = response.body.new_password[0];
    } else if (response.body?.hasOwnProperty("old_password")) {
      response["message"] = response.body.old_password[0];
    }

    setPasswordUpdateResponse(response);
  };

  const handleInvitation = async (e) => {
    e.preventDefault();
    setInvitationResponse(null);
    const response = await fetchInvitation(invitationEmail);

    if (!response.error) {
      setInvitationEmail("");
    }

    setInvitationResponse(response);
  };

  const handleTagSelection = (tag) => {
    setTagNewValue(tag);
    setTagSelected(tag);
    editTagInputRef.current.focus();
  };

  const handleTagUpdate = async () => {
    const response = await fetchUpdateTag(tagSelected, tagNewValue);

    if (response.error) {
      return;
    }
    const newTag = response;
    const updatedTags = userTags;
    const indexToUpdate = userTags.findIndex((tag) => tag.name === tagSelected);
    updatedTags[indexToUpdate] = newTag;
    setTagSelected(newTag.name);
    setUserTags([...updatedTags]);
  };

  const handleTagDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure ? Tag will be permanently deleted"
    );

    if (!confirmation) {
      return;
    }

    const response = await fetchRemoveTag(tagSelected);
    const updatedTags = userTags;
    const indexToDelete = userTags.findIndex((tag) => tag.name === tagSelected);
    updatedTags.splice(indexToDelete, 1);
    setTagNewValue("");
    setTagSelected(null);

    setUserTags([...updatedTags]);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("LOGOUT Attzmpt");
    dispatch(fetchLogout());
  };

  return (
    <div className="profile">
      <div className="profile__title">
        <h1>
          <i className="fa fa-user"></i> Profile
          <form action="">
            <button
              onClick={handleLogout}
              className="profile__disconnect"
              type="submit"
            >
              Logout
            </button>
          </form>
        </h1>
      </div>
      <div className="profile__boxes">
        <div className="profile__box">
          <h2>
            User <i className="fa fa-bookmark"></i>
          </h2>
          <p className="profile__infos">
            You are connected as <b>contributor</b>, you can add, edit, and
            remove tags.
          </p>
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
            />
          </div>
          <button className="profile__button" type="submit">
            Change
          </button>
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
                tags={userTags}
                showOnFocus={false}
              />
            )}
            <div className="profile__tag-box__edit">
              <input
                value={tagNewValue}
                onChange={(e) => setTagNewValue(e.target.value)}
                className="profile__tag-box__edit__bar"
                type="text"
                disabled={tagSelected ? false : true}
                ref={editTagInputRef}
              />
              <button
                disabled={tagSelected ? false : true}
                onClick={handleTagUpdate}
                className="profile__tag-box__edit__button profile__tag-box__edit__button--valid"
              >
                <i className="fa fa-check"></i>
              </button>
              <button
                onClick={handleTagDelete}
                disabled={tagSelected ? false : true}
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
            <button className="profile__button" type="submit">
              Send
            </button>
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
            <a href="https://discord.gg/RzBMAKU">Discord</a>.
          </p>
          <p className="profile__infos">
            You can send large amount of images or fork this collection of
            screenshots at
            <a href="https://github.com/The-Alpha-Project/Alpha-Project-Archive">
              {" "}
              Alpha Project Archive
            </a>
            .
          </p>
          <p className="profile__infos">
            <Link to="/upload">Upload page</Link> filters screenshots to avoid
            100% exact duplicates. You can check in depth with software like
            <a href="https://www.digikam.org/"> DigiKam (linux)</a> or{" "}
            <a href="https://github.com/ermig1979/AntiDupl">
              Antidupl (Windows)
            </a>
          </p>
        </div>
      </div>

      {/* <div className="profile__actions"></div> */}
    </div>
  );
};
