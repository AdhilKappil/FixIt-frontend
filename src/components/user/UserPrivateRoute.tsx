import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { openLoginModal } from "../../slices/modalSlices/loginModal";
import { Outlet, useNavigate } from "react-router-dom";

const UserPrivateRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Open login modal if userInfo doesn't exist
    useEffect(() => {
        if (!userInfo) {
            navigate('/');
            dispatch(openLoginModal());
        }
    }, [dispatch, navigate, userInfo]);

    // Return Outlet if userInfo exists, otherwise return null
    return userInfo ? <Outlet /> : null;
}

export default UserPrivateRoute;
