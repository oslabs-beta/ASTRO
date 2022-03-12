import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getFuncs } from '../features/slices/funcListSlice';
import { nameChange } from '../features/slices/chartSlice'


export const SideBar = (props) => {

  const list = useSelector((state) => state.funcList.funcList)
  const dispatch = useDispatch()

   useEffect(() => {
     dispatch(getFuncs())
   }, [])

  console.log('this is funcList', list)

  const handleClick = (key) => {
    console.log('this is the key', key)
    dispatch(nameChange(key))
  }
 
  return(
    <div>
      {list.map((element, idx) =>
        <button
          key={idx}
          onClick={() => handleClick(idx)}
        >
          {element}
        </button>
      )}
    </div>
 )
}


/**
 * @Remember { Axios }
 * @Remember {https://reactjs.org/docs/conditional-rendering.html}
 */