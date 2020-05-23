import React, { useState, useMemo } from "react";
import { Account } from "./Account";
import { useCookies } from "react-cookie";
import queryString from "query-string";

const initialAcount: Account = {
  lastname: "田中",
  firstname: "太郎",
  employee_number: 9999,
};

const IndexPage: React.FC = () => {
  const [cookies, setCookie] = useCookies(["account"]);
  const [myAccount, setMyAccount] = useState(cookies.account || initialAcount);

  const [url, setUrl] = useState(
    new URL(
      "https://docs.google.com/forms/d/e/1FAIpQLSe_F8JbKycAN7LK7UjF29eWaz4uLWzmQ09xSX2i7zltWYnWPw/viewform"
    )
  );

  const handleLastNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    myAccount.lastname = e.target.value;
    setMyAccount(myAccount);
  };

  const handleFirstNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    myAccount.firstname = e.target.value;
    setMyAccount(myAccount);
  };

  const handleEmployeeNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    myAccount.employee_number = e.target.value;
    setMyAccount(myAccount);
  };

  const handleSubmit = () => {
    const values = {
      lastname: myAccount.lastname,
      firstname: myAccount.firstname,
      employee_number: myAccount.employee_number,
    };
    setCookie("account", values, { path: "/" });
  };

  useMemo(() => {
    const now = new Date();
    const url_string = queryString.stringifyUrl({
      url:
        "https://docs.google.com/forms/d/e/1FAIpQLSe_F8JbKycAN7LK7UjF29eWaz4uLWzmQ09xSX2i7zltWYnWPw/viewform",
      query: {
        "entry.257849901": myAccount.lastname + " " + myAccount.firstname,
        "entry.1208809069": myAccount.employee_number,
        "entry.235813066_year": `${now.getFullYear()}`,
        "entry.235813066_month": `${now.getMonth() + 1}`,
        "entry.235813066_day": `${now.getDate()}`,
      },
    });

    const generate_url = new URL(url_string);
    setUrl(generate_url);
  }, [myAccount.employee_number, myAccount.firstname, myAccount.lastname]);

  const renderRedirect = () => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.redirect === "yes") {
      window.location.href = url.href;
    }
  };

  renderRedirect();

  return (
    <>
      <h2>daily report entrance 2020</h2>
      <a href={url.href} target="_blank" rel="noopener noreferrer">
        {decodeURIComponent(url.host) +
          "/" +
          myAccount.lastname +
          myAccount.firstname +
          "/" +
          myAccount.employee_number}
      </a>
      <form>
        <h3>Path Settings</h3>
        <ul>
          <li>
            lastname(姓) :
            <input
              type="text"
              defaultValue={myAccount.lastname}
              onChange={handleLastNameInputChange}
            />
          </li>
          <li>
            firstname(名) :
            <input
              type="text"
              defaultValue={myAccount.firstname}
              onChange={handleFirstNameInputChange}
            />
          </li>
          <li>
            employee number :
            <input
              type="text"
              defaultValue={myAccount.employee_number}
              onChange={handleEmployeeNumberInputChange}
            />
          </li>
        </ul>
         
        <a
          href="/daily-report-entrance-2020/"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          入力内容の保存
        </a>
      </form>
    </>
  );
};

export default IndexPage;
