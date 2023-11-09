import { useState } from "react";
import {
  PinIcon,
  SendIcon,
  SmileyIcon,
  UpDownArrow,
} from "../../../../../../assets/icons/icons";
import { RevvexButton } from "../../../../../buttons/button";
import { GetInitials } from "../../../../../helpers/helpers";
import "./chats.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Chats = () => {
  const messageHead = ["Name", "Status"];
  const messageDetails = [
    {
      name: "Hassan Lamidi",
      status: "active",
    },
    {
      name: "Akintoye Olamide",
      status: "closed",
    },
    {
      name: "Hassan Olamide",
      status: "closed",
    },
    {
      name: "Ikeogu Emmanuel",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "Closed",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
    {
      name: "Oluwatosin Dada",
      status: "active",
    },
  ];
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="support-chats-wrap">
      {/* left-wrap start */}
      <div className="left-wrap">
        <div className="msg-text-wrap">
          <p>All Messages</p>
          <figure className="arrow-icon">{UpDownArrow}</figure>
        </div>
        {/* message table wrap start */}
        <div className="message-head-wrap">
          {messageHead.map((chi, idx) => (
            <p className="message-head" key={idx}>
              {chi}
            </p>
          ))}
        </div>

        {/* message body-wrap start */}
        <div className="message-body-wrap">
          {messageDetails.map((chi, idx) => {
            const { name, status } = chi;
            return (
              <div key={idx} className="message-body-box">
                {/* the name active class should only be called */}
                {/* when the user name is displayed on the chat :)*/}
                <p className={`name ${idx === 0 ? "name-active" : ""}`}>
                  {name}
                </p>
                <p
                  className={`status ${
                    status.toLowerCase() === "closed" ? "status-closed" : ""
                  }`}
                >
                  {status}
                </p>
              </div>
            );
          })}
        </div>
        {/* message body-wrap end */}
        {/* message table wrap end */}
      </div>
      {/* left-wrap end */}

      {/* right-wrap start */}
      <div className="right-wrap">
        <div className="top-wrap">
          <p className="chat-name">{"Hassan Lamidi"}</p>
          <RevvexButton label="Close Chat" btnClassName="close-btn" />
        </div>

        {/* chat-wrap start */}
        <div className="chat-body-wrap">
          <div className="chat-body-group">
            {/* reciever start */}
            <div className="message-box-left-wrap">
              <p className="chat-initials">{GetInitials("Hassan Lamidi")}</p>
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                <Skeleton
                  width={"32rem"}
                  height={"10rem"}
                  baseColor="#D9D9D9"
                />
                {/* <span className="message-box"></span> */}
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* reciever end */}

            {/* sender start */}
            <div className="message-box-right-wrap">
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                {/* <span className="message-box"></span> */}
                <Skeleton width={"32rem"} height={"7rem"} baseColor="#D9D9D9" />
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* sender end */}
            {/* reciever start */}
            <div className="message-box-left-wrap">
              <p className="chat-initials">{GetInitials("Hassan Lamidi")}</p>
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                <Skeleton
                  width={"32rem"}
                  height={"10rem"}
                  baseColor="#D9D9D9"
                />
                {/* <span className="message-box"></span> */}
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* reciever end */}

            {/* sender start */}
            <div className="message-box-right-wrap">
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                {/* <span className="message-box"></span> */}
                <Skeleton width={"32rem"} height={"7rem"} baseColor="#D9D9D9" />
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* sender end */}
            {/* reciever start */}
            <div className="message-box-left-wrap">
              <p className="chat-initials">{GetInitials("Hassan Lamidi")}</p>
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                <Skeleton
                  width={"32rem"}
                  height={"10rem"}
                  baseColor="#D9D9D9"
                />
                {/* <span className="message-box"></span> */}
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* reciever end */}

            {/* sender start */}
            <div className="message-box-right-wrap">
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                {/* <span className="message-box"></span> */}
                <Skeleton width={"32rem"} height={"7rem"} baseColor="#D9D9D9" />
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* sender end */}
            {/* reciever start */}
            <div className="message-box-left-wrap">
              <p className="chat-initials">{GetInitials("Hassan Lamidi")}</p>
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                <Skeleton
                  width={"32rem"}
                  height={"10rem"}
                  baseColor="#D9D9D9"
                />
                {/* <span className="message-box"></span> */}
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* reciever end */}

            {/* sender start */}
            <div className="message-box-right-wrap">
              {/* message box (receiver) and time start */}
              <div className="message-box-group">
                {/* <span className="message-box"></span> */}
                <Skeleton width={"32rem"} height={"7rem"} baseColor="#D9D9D9" />
                <p className="time">11:25</p>
              </div>
              {/* message box (receiver) and time end */}
            </div>
            {/* sender end */}
          </div>

          {/* send message box start */}
          <div className="message-field-wrap">
            <textarea
              placeholder="Type your message here"
            //   type="text"
              id="new_message"
              name="new_message"
              className="new-message-input"
              value={newMessage}
              onChange={(e: any) => setNewMessage(e.target.value)}
              
            />
            <label htmlFor="new_message" className="label-wrap">
              <figure>{PinIcon}</figure>
              <figure>{SmileyIcon}</figure>
              <figure>{SendIcon}</figure>
            </label>
          </div>
          {/* send message box end */}

          {/* online/active user wrap start */}
          <div className="active-user-details-bottom-wrap">
            <div className="active-user-wrap">
              <p className="active-user">Hassan Lamidi</p>
              <p className="active-text">Active</p>
            </div>
            <div className="active-user-two-wrap">
              <p className="active-user-two">Ayeni Kehinde</p>
              <p className="active-time">10:27AM</p>
            </div>
          </div>
          {/* online/active user wrap end */}
        </div>

        {/* chat-wrap end */}
      </div>
      {/* right-wrap end */}
    </div>
  );
};
export default Chats;
