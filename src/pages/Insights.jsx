import React from 'react';
import { SideBar } from '../components/Sidebar.jsx';
import { AccountTotals } from '../components/AccountTotals.jsx'
import { Dashboard } from '../components/Dashboard.jsx'
import { useSelector } from 'react-redux';


export const Insights = () =>{

  const componentChange = useSelector((state) => state.toggleInsights.toggle);

  const componentSwitch = (componentName) => {
    switch(componentName){
      case 'Account Total':
        return <AccountTotals/>
      case 'Functions':
        return <Dashboard />
    }
  }

  return (

    <div>

      <SideBar/>

      {componentSwitch(componentChange)}

    </div>

    );
}

