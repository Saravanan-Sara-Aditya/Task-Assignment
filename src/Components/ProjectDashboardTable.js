import React, { useState } from 'react';
import { Table, Tooltip, Timeline, Collapse } from 'antd';
import StatusComponent from './Status';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Panel } = Collapse;

const columns = [
    {
        title: '',
        dataIndex: 'projectTimeline',
        key: 'projectTimeline',
        render: () => {

            return (
                <Collapse defaultActiveKey={[]}>
                    <Panel
                    
                    >
                        <Timeline
                            mode="left"
                            items={[
                                {
                                    children: 'Create a services site 2015-09-01',
                                },
                                {
                                    children: 'Solve initial network problems 2015-09-01',
                                },
                                {


                                    children: 'Technical testing 2015-09-01',
                                },
                                {
                                    children: 'Network problems being solved 2015-09-01',
                                },
                            ]}
                        />
                    </Panel>
                </Collapse>
            );
        }


    },
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'PROJECT NAME',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (name) => <span style={{ color: '#8a2be2', fontWeight: '600' }}>{name}</span>,
    },
    {
        title: 'PM',
        dataIndex: 'projectManager',
        key: 'projectManager',
        render: (projectManager) => {
            const pmInitials = projectManager ? projectManager.slice(0, 2).toUpperCase() : '';
            return (
                <Tooltip title={projectManager}>
                    <div style={{
                        width: 35,
                        height: 35,
                        borderRadius: '50%',
                        backgroundColor: '#8a2be2',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontWeight: 'light',
                        fontSize: '12px',
                    }}>
                        {pmInitials}
                    </div>
                </Tooltip>
            );
        },
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (status) => <StatusComponent status={status} />,
    },
    {
        title: 'LAST UPDATE',
        dataIndex: 'lastUpdate',
        key: 'lastUpdate',
        render: (lastUpdate) => {
            if (lastUpdate) {
                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = new Date(lastUpdate).toLocaleString('en-US', dateOptions);
                return formattedDate;
            }
            return 'N/A';
        }
    },
    {
        title: 'RESOURCES',
        dataIndex: 'resources',
        key: 'resources',
        render: (resources) => (
            <Tooltip title={<div style={{ display: 'block' }}>{resources.map((resource, index) => <div key={index}>{resource}</div>)}</div>}>
                <span className="rounded pt-1 pb-1 ps-2 pe-2 light-grey">{`${resources.length}`}</span>
            </Tooltip>
        ),
    },
    {
        title: 'PROJECT TIMELINE',
        dataIndex: 'projectTimeline',
        key: 'projectTimeline',
        render: (projectTimeline) => {
            if (projectTimeline && projectTimeline.startDate && projectTimeline.endDate) {
                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const startDate = new Date(projectTimeline.startDate).toLocaleString('en-US', dateOptions);
                const endDate = new Date(projectTimeline.endDate).toLocaleString('en-US', dateOptions);

                return (
                    <>
                        <span className="light-grey  ps-2 pe-2 pt-0 pb-0 rounded">{startDate}</span>
                        {" "}<FontAwesomeIcon icon={faChevronRight} size="xs" color="grey" />{" "}
                        <span className="light-grey  ps-2 pe-2 pt-0 pb-0 rounded">{endDate}</span>
                    </>
                );
            }

            return 'N/A';
        }
    },
    {
        title: 'ESTIMATED AMOUNT',
        dataIndex: 'estimation',
        key: 'estimation',
        render: (estimation) => {
            return (
                <>
                    <span style={{ fontWeight: "500" }}>$US {estimation} K</span>
                </>
            );
        }
    },
];


function ProjectDashboardTable({ projects }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

  const paginationOptions = {
      
      current: 1, 
    pageSizeOptions: ['5', '10', '15', '20'], 
    showSizeChanger: true, 
    onShowSizeChange: (current, size) => {
     
        console.log(`Current page: ${current}, Page size: ${size}`);
    },
};

return (
    <Table
        columns={columns}
        dataSource={projects}
        rowSelection={rowSelection}
        rowKey="id"
        pagination={paginationOptions} 
    />
);
}

export default ProjectDashboardTable;