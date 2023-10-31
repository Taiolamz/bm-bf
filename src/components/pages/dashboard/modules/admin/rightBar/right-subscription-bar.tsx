// import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
// import { SmallArrowBack } from "../../../../../../assets/icons/icons";
import SubscriberImg from "../../../../../../assets/subscribed-profile-picture.svg";
import "./right-subscription-bar.css";

const DashboardRightSubscriptionBar = () => {
  const subscribedUsers = [
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
    {
      name: "John Doe",
      date: "Oct 31, 2077",
      amount: "N20,000",
      duration: "month",
      profile_picture: SubscriberImg,
    },
  ];
  return (
    <div className="right-bar-subscription-wrap">
      <p className="right-bar-subscribe-title">Recent Subscriptions</p>

      <div className="right-bar-subscription-box">
        <div className="right-bar-subscribed-users-wrap">
          {subscribedUsers.map((chi, idx) => {
            const { name, date, amount, duration, profile_picture } = chi;
            return (
              <div key={idx} className="right-bar-subscribed-users-box">
                <div className="right-bar-sub-name-date-wrap">
                  <img
                    className="right-bar-sub-user-img"
                    src={profile_picture}
                    alt={profile_picture}
                  />
                  <div className="name-wrap">
                    <p className="name">{name}</p>
                    <p className="date">{date}</p>
                  </div>
                </div>
                <div className="right-bar-sub-amount-duration-wrap">
                  <p className="amount">{amount}</p>
                  <p className="duration">{`/ ${duration}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DashboardRightSubscriptionBar;
