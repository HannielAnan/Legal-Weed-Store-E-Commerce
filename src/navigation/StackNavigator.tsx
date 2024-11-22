import React from 'react';
import {RouterProvider, createBrowserRouter, Route, Router, Routes,} from 'react-router-dom';

import {screens} from '../screens';
import {TabNavigator} from './TabNavigator';
import AboutUs from '../screens/aboutus';
import Careers from '../screens/careers';
import Login from '../screens/Login';
import { Home } from '../screens/tabs/Home';
import Dashboard from "../screens/Dashboard";

const stack = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <screens.SignIn />,
  // },
  {
    path: '/',
    element: <TabNavigator />,
  },
  {
    path: '/EditProfile',
    element: <screens.EditProfile />,
  },
  {
    path: '/Product',
    element: <screens.Product />,
  },
  {
    path: '/Shop',
    element: <screens.Shop />,
  },
  {
    path: '/Reviews',
    element: <screens.Reviews />,
  },
  {
    path: '/Description',
    element: <screens.Description />,
  },
  {
    path: '/OrderHistory',
    element: <screens.OrderHistory />,
  },
  {
    path: '/Checkout',
    element: <screens.Checkout />,
  },
  {
    path: '/OrderSuccessful',
    element: <screens.OrderSuccessful />,
  },
  {
    path: '/OrderFailed',
    element: <screens.OrderFailed />,
  },
  {
    path: '/MyPromocodes',
    element: <screens.MyPromocodes />,
  },
  {
    path: '/SignOut',
    element: <screens.SignOut />,
  },
  {
    path: '/SendPhoneOtp',
    element: <screens.SendPhoneOtp />,
  },
  {
    path: '/VerifyEmail',
    element: <screens.VerifyEmail />,
  },
  {
    path: '/VerifyPhone',
    element: <screens.VerifyPhone />,
  },
  {
    path: '/SendEmailOtp',
    element: <screens.SendEmailOtp />,
  },
  {
    path: '/OrderHistoryEmpty',
    element: <screens.OrderHistoryEmpty />,
  },
  {
    path: '/EmailVerified',
    element: <screens.EmailVerified />,
  },
  {
    path: '/PhoneVerified',
    element: <screens.PhoneVerified />,
  },
  {
    path: '/SignUp',
    element: <screens.SignUp />,
  },
  {
    path: '/Login',
    element: <Login/>,
  },
  {
    path: '/SignUpAccountCreated',
    element: <screens.SignUpAccountCreated />,
  },
  {
    path: '/ForgotPassword',
    element: <screens.ForgotPassword />,
  },
  {
    path: '/NewPassword',
    element: <screens.NewPassword />,
  },
  {
    path: '/ForgotPasswordSentEmail',
    element: <screens.ForgotPasswordSentEmail />,
  },
  {
    path: '/DeleteAccount',
    element: <screens.DeleteAccount />,
  },
  {
    path: '/ShippingAndPaymentInfo',
    element: <screens.ShippingAndPaymentInfo />,
  },
  {
    path: '/InfoSaved',
    element: <screens.InfoSaved />,
  },
  {
    path: '/LeaveAReview',
    element: <screens.LeaveAReview />,
  },
  {
    path: '/MyPromocodesEmpty',
    element: <screens.MyPromocodesEmpty />,
  },
  {
    path: '/Filter',
    element: <screens.Filter />,
  },
  {
    path: '/aboutus',
    element: <AboutUs />,
  },
  {
    path: '/careers',
    element: <Careers />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/shop/:id', // Dynamic route for product ID
    element: <screens.Shop />,
  },

]);

export const StackNavigator: React.FC = () => {
  return <RouterProvider router={stack} />;
};
