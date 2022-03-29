import React from 'react';
import { SideBar } from '../components/Sidebar.jsx';
import { Navigation } from './AppBar.jsx'
import { timePeriod } from '../../src/components/timePeriod'
import { AccountTotals } from '../components/AccountTotals.jsx'
import { toggleChange } from '../features/slices/insightsToggleSlice'
import { Dashboard } from '../components/Dashboard.jsx'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';



export const Insights = () =>{

  const componentChange = useSelector((state) => state.toggleInsights.toggle);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleChange(componentChange))
  }, [componentChange])

  
  const componentSwitch = (componentName) => {
    switch(componentName){
      case 'Account Total':
        return <AccountTotals data-testid="accountTotals"/>
      case 'Functions':
        return <Dashboard />
    }
  }

  return (

    <>
      <timePeriod/>
      <Navigation/>

    </>

    );
}

