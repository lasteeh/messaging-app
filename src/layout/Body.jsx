import React from 'react';
import Nav from './Navbar';
import Sidepanel from './Sidepanel';
import Chatbox from './Chatbox';

export default function Body() {
  return (
    <div className="flex">
        <Nav/>
        <Sidepanel/>
        <Chatbox/>
    </div>
  )
}