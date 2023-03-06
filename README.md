# Chemical Tank Control Panel Ui
Contains GUI control panel for checking chemical level of tanks located in auto dog washing machines.

Uses react framework

Graphics are created by using soleyl css allowing for dynamically change visuals with logic that uses data from tanks

Tank visuals changes accordingly to amount of chemical inside them

GUI optimized to be used with mobile devices and let user acces analytic information

# CoolTank.jsx & CoolTank.module.css
creates a tank visual depending on data from databse including chemical in tank and chemical level

# TankContainer.jsx
creates array of tanks dynamically accordingly to amount of tanks in each device

# Device.jsx
Component that contains tankcontainer and other device realted information & controls

# DeviceList.jsx
shows all devices that currently running and lets user perform incremental search on list
