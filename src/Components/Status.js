import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

const StatusComponent = ({ status, record }) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleStatusChange = (newStatus) => {
        setCurrentStatus(newStatus);
        setDropdownVisible(false); 
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 'On Track':
                return 'text-green-500 bg-green-100 ps-2 pe-2 pt-0 pb-0 rounded w-100';
            case 'Potential Risk':
                return 'text-orange-500 bg-orange-100 ps-2 pe-2 pt-0 pb-0 rounded w-100';
            case 'At Risk':
                return 'text-red-500 bg-red-100 ps-2 pe-2 pt-0 pb-0 rounded w-100';
            case 'On Hold':
                return 'text-black  light-grey ps-2 pe-2 pt-0 pb-0 rounded w-100';
            default:
                return '';
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <span
                onClick={toggleDropdown}
                className={getStatusClassName(currentStatus)}
                style={{ cursor: 'pointer' }}
            >
                {currentStatus} <FontAwesomeIcon icon={faChevronDown} size={"xs"} />
            </span>
            {dropdownVisible && (
                <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1, background: 'white', border: '1px solid #ccc', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',width:"120px" }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: '5px 0' }}>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => handleStatusChange('On Track')}
                        >
                            <span className="text-green-500">On Track</span>
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => handleStatusChange('Potential Risk')}
                        >
                            <span className="text-orange-500">Potential Risk</span>
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => handleStatusChange('At Risk')}
                        >
                            <span className="text-red-500">At Risk</span>
                        </li>
                        <li
                            style={{ padding: '5px 10px', cursor: 'pointer' }}
                            onClick={() => handleStatusChange('On Hold')}
                        >
                            <span className="text-gray-900">On Hold</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StatusComponent;
