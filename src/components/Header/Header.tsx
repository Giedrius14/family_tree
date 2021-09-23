import React from 'react';
import styles from './Header.module.scss';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import FamilyTree from '../FamilyTree/FamilyTree';

const Header = () => {
    const location = useLocation();
    const menuItems = [
        {
            title: 'View mode',
            pageURL: '/'
        },
        {
            title: 'Edit mode',
            pageURL: '/edit'
        }
    ];

    return (
        <div className={styles.Header}>
            <ul className={styles.navContainer}>
                {menuItems.map(({title, pageURL}: any) =>
                    (
                        <li key={title} className={`${styles.listItem} ${location.pathname === pageURL && styles.active}`}>
                            <Link to={pageURL} className={styles.link}>{title}</Link>
                        </li>
                    ))
                }
            </ul>
            <Switch>
                <Route path="/edit">
                    <FamilyTree editMode={true}/>
                </Route>
                <Route path="/" component={FamilyTree}>
                </Route>
            </Switch>
        </div>
    );
};

export default Header;
