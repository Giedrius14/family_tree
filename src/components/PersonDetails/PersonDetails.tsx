import React from 'react';
import styles from './PersonDetails.module.scss';
import { FamilyMember } from '../FamilyTree/types';

const PersonDetails = ({member}: {member: FamilyMember}) =>
    (
        <div className={styles.PersonDetails} data-testid="PersonDetails">
            <div className={styles.personPicture}>
                {member.picture && <img src={member.picture} alt="memberPicture"/>}
            </div>
            <div className={styles.personName}>
                <div>{member.firstName}</div>
                <div>{member.lastName}</div>
                <div>{member.birthDate} - {member.deathDate}</div>
            </div>
        </div>
    );

export default PersonDetails;
