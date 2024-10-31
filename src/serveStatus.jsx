import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import { TbTriangle } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styles from "./serveStatus.module.css";


const app = new Realm.App({ id: process.env.REACT_APP_MongoRealmID });

export function ServeStatusView() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState([]);
  function getStatus() {
    axios.get(process.env.REACT_APP_END_POINT).then(function (response) {
      setStatus(response.data);
    }); 
  }

  useEffect(() => {
    getStatus();

    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getStatus();

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getStatus();
      }
    };
    login();
  }, []);

  function StatusItem({ element }) {
    return (
      <div className={styles.container}>
        <p className={styles.elementName}>{element.name}</p>
        {element.status === 0 ? (
          <>
            <FaRegCircle size={40} />
            <p className={styles.status}>提供中</p>
          </>
        ) : element.status === 1 ? (
          <>
            <TbTriangle size={40} />
            <p className={styles.status}>待ち時間有</p>
          </>
        ) : (
          <>
            <RxCross2 size={40} />
            <p className={styles.status}>提供停止</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.serveStatusView}>
        <h1>提供状況</h1>
        <p>提供状況はリアルタイムで更新されています。</p>
      <div className={styles.statusList}>
        {status.map((element) => (
          <StatusItem element={element} />
        ))}
      </div>
    </div>
  );
}

export function ServeStatusBanner(){
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState([]);
  function getStatus() {
    axios.get(process.env.REACT_APP_END_POINT).then(function (response) {
      setStatus(response.data);
    }); 
  }

  useEffect(() => {
    getStatus();

    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user); // Connect to the database
      getStatus();

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("test").collection("status"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
        getStatus();
      }
    };
    login();
  }, []);

  function StatusItem({ element }) {
    return (
      <div className={styles.container_banner}>
        <p className={styles.elementName_banner}>{element.name}</p>
        {element.status === 0 ? (
          <>
            {/* <FaRegCircle size={40} /> */}
            <p className={styles.status_banner}>提供中</p>
          </>
        ) : element.status === 1 ? (
          <>
            {/* <TbTriangle size={40} /> */}
            <p className={styles.status_banner}>待ち時間有</p>
          </>
        ) : (
          <>
            {/* <RxCross2 size={40} /> */}
            <p className={styles.status_banner}>提供停止</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.serveStatusView_banner}>
        <p>提供状況</p>
        <p>提供状況はリアルタイムで更新されています。</p>
      <div className={styles.statusList_banner}>
        {status.map((element) => (
          <StatusItem element={element} />
        ))}
      </div>
    </div>
  );
}