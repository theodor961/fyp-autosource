import React, { useState } from 'react';
import d5 from './Mainnav.module.css'; //scoped css only used for this file
import AccountInfo from './AccountInfo';
import MenuContent from './MenuContent';
import FooterMenuContent from './FooterMenuContent';
import MenuIcon from './MenuIcon';


export default function Mainnav(props) {

    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => { setIsOpen(!isOpen) };

    return (
        <div>
            <MenuIcon state={isOpen} onClick={() => handleToggle()} />
            <div className={isOpen ? d5.opened : d5.closed}>
                <div className={d5.backdrop} onClick={() => handleToggle()} />
                <div className={d5.menu} >
                    <div className={d5.title}><p>AutoSource</p></div>
                    <AccountInfo onClick={() => handleToggle()} />
                    <MenuContent onClick={() => handleToggle()} />
                    <FooterMenuContent onClick={() => handleToggle()} />
                </div>
            </div>

            <header className={d5.header}/>
            <div className={d5.backheader}></div>
        </div>
    );
}