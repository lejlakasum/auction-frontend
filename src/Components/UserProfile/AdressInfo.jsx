import React from "react";
import "../../index.css"
import GenericField from "../FormField/GenericField";
import Dropdown from "react-dropdown"

const AdressInfo = props => {

    return (
        <div id="user-page-address" ref={props.addressRef} className="user-box profile-box">
            <div className="profile-heading">OPTIONAL</div>
            <div className="profile">
                <div className="profile-image">

                </div>
                <div className="profile-info">
                    <div className="address-heading">Address</div>
                    <GenericField
                        key="street_input"
                        placeholder="e.g. 5th Avenue"
                        genericClass="profile-generic"
                        value={props.userInfo.street}
                        onChange={(e) => props.onChange("street", e.target.value, "address")}
                        id={"street"}
                        label={"Street"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.street}
                    />
                    <div id="user-address-country" className="profile-label">
                        <label className="generic-field">Country</label>
                        <Dropdown
                            className="country-dropdown"
                            menuClassName="gender-dropdown-menu"
                            controlClassName="control-dropdown"
                            placeholder="Select country"
                            value={props.userInfo.country}
                            options={props.countryOptions}
                            onChange={(e) => props.onCountryChange("country", e.value, "address")}
                        />
                        <small>
                            <label className={"validation-error small"}>{props.validation.country}</label>
                        </small>
                    </div>
                    <GenericField
                        key="state_input"
                        placeholder="e.g. New York"
                        genericClass="profile-generic"
                        value={props.userInfo.state}
                        onChange={(e) => props.onChange("state", e.target.value, "address")}
                        id={"state"}
                        label={"State"}
                        type={"text"}
                        className="profile-input"
                        validationMessage={props.validation.state}
                    />
                    <div className="city-zip">
                        <div id="user-address-city" className="address-width profile-label city-label">
                            <label className="generic-field">City</label>
                            <Dropdown
                                className="country-dropdown"
                                menuClassName="gender-dropdown-menu"
                                controlClassName="control-dropdown"
                                placeholder="Select city"
                                value={props.userInfo.city}
                                options={props.cityOptions}
                                onChange={(e) => props.onChange("city", e.value, "address")}
                            />
                            <small>
                                <label className={"validation-error small"}>{props.validation.city}</label>
                            </small>
                        </div>
                        <div className="address-width">
                            <GenericField
                                key="zipCode_input"
                                placeholder="e.g. 10065"
                                genericClass="profile-generic"
                                value={props.userInfo.zipCode}
                                onChange={(e) => props.onChange("zipCode", e.target.value, "address")}
                                id={"zipCode"}
                                label={"ZipCode"}
                                type={"text"}
                                className="profile-input"
                                validationMessage={props.validation.zipCode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdressInfo;