import React from "react";
import { useState } from "react";
import Profile from "../../Components/UserProfile/Profile";
import UserBids from "../../Components/UserProfile/UserBids";
import Settings from "../../Components/UserProfile/Settings";
import UserProfileHeader from "../../Components/UserProfile/UserProfileHeader";
import "../../index.css"
import Header from "../HeaderFooter/Header";
import { useEffect } from "react";
import getMonths from "../../Util/getMonths";
import { storage } from "../../firebase"

const User = props => {

    const [active, setActive] = useState({
        home: "nav-inactive",
        shop: "nav-inactive",
        account: "nav-active"
    })
    const headerActiveClass = "nav-profile-button-active"
    const [profileHeaderActive, setProfileHeaderActive] = useState("profile")
    const [headerClasses, setHeaderClasses] = useState({
        profile: headerActiveClass,
        bids: "",
        settings: ""
    })

    const [userBids, setUserBids] = useState([{
        id: 0,
        name: "",
        auctionEndDate: "",
        userBid: 0,
        highestBid: 0,
        numberOfBids: 0,
        imgUrl: ""
    }])

    const [genderOptions, setGenderOptions] = useState(["Male", "Female", "Other"])
    const [monthOptions, setMonthOptions] = useState([])
    const [yearOptions, setYearOptions] = useState([])
    const [dayOptions, setDayOptions] = useState([])

    const [userInfo, setUserInfo] = useState(
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            birthDay: "5",
            birthMonth: "August",
            birthYear: "1990",
            phoneNumber: "555-5555-555",
            email: "john.doe@mail.com",
            imageUrl: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
            street: "",
            city: "",
            zipCode: "",
            state: "",
            country: "",
            nameOnCard: "",
            paypal: false,
            card: false,
            cardNumber: "",
            cardExpYear: "",
            cardExpMonth: "",
            cvc: ""
        }
    )

    function handleUserInfoChange(name, value) {
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    useEffect(() => {
        //TODO Axios api call get user bids
        var bids = [{
            id: 10,
            name: "Black Jacket",
            auctionEndDate: "1605312000000",
            userBid: 50,
            highestBid: 100.25,
            numberOfBids: 3,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 11,
            name: "Tablet",
            auctionEndDate: "1605484800000",
            userBid: 150,
            highestBid: 500.17,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        },
        {
            id: 5,
            name: "Shoes",
            auctionEndDate: "1606521600000",
            userBid: 230,
            highestBid: 230,
            numberOfBids: 1,
            imgUrl: "https://www.namepros.com/attachments/empty-png.89209/"
        }
        ]
        setUserBids(bids)
        setMonthOptions(getMonths())
        setYearOptions(Array(2100 - 1900 + 1).fill().map((item, index) => 1900 + index))
        setDayOptions(Array(31 - 1 + 1).fill().map((item, index) => 1 + index))

        //TODO Axios api call get user info

    }, [])

    function getNumberOfDays(month, year) {
        return new Date(year, month, 0).getDate()
    }

    function onHeaderClick(activeButton) {
        switch (activeButton) {
            case "profile":
                setProfileHeaderActive("profile")
                setHeaderClasses({ profile: headerActiveClass, bids: "", settings: "" })
                break;
            case "bids":
                setProfileHeaderActive("bids")
                setHeaderClasses({ profile: "", bids: headerActiveClass, settings: "" })
                break;
            case "settings":
                setProfileHeaderActive("settings")
                setHeaderClasses({ profile: "", bids: "", settings: headerActiveClass })
                break;
        }
    }

    function saveInfo() {
        //TODO validate all data
        //TODO call api to save data
        //TODO give user feedback on saving
    }

    function changeImage(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            const uploadTask = storage.ref(`profile_images/${userInfo.id}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("profile_images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            handleUserInfoChange("imageUrl", url)
                        });
                }
            );
        }
    }

    function SetSection() {
        if (profileHeaderActive == "profile") {
            return <Profile
                genderOptions={genderOptions}

                monthOptions={monthOptions}
                yearOptions={yearOptions}
                dayOptions={dayOptions}

                onChange={handleUserInfoChange}
                userInfo={userInfo}
                saveInfo={saveInfo}
                changeImage={changeImage}
            />
        }
        else if (profileHeaderActive == "bids") {
            return <UserBids bids={userBids} />
        }
        else if (profileHeaderActive == "settings") {
            return <Settings />
        }
        return <div></div>
    }


    return (
        <div>
            {console.log(userInfo)}
            <Header active={active} />
            <div className="wrapper">
                <UserProfileHeader setActive={onHeaderClick} classes={headerClasses} />
                {SetSection()}
            </div>
        </div>
    )
}

export default User;