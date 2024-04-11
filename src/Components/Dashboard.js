import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Badge,Tooltip } from 'antd';
import TopNavbar from '../Layouts/TopNavbar';
import ProjectDashboardTable from './ProjectDashboardTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
const { TabPane } = Tabs;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Projects');
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onFilterApply = (filterType, filterValue) => {
    let filtered = projects;

    if (filterType === 'All') {
      filtered = projects;
    } else if (filterType === 'Project Name' && filterValue) {
      filtered = projects.filter(project =>
        project.projectName && project.projectName.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === 'PM' && filterValue) {

      filtered = projects.filter(project =>
        project.projectManager && filterValue.includes(project.projectManager)
      );
    } else if (filterType === 'Resources' && filterValue) {
      filtered = projects.filter(project =>
        project.resources && filterValue.every(resource => project.resources.includes(resource))
      );
    } else if (filterType === 'Estimation' && filterValue) {
      const { min, max } = filterValue;
      const minNum = parseFloat(min);
      const maxNum = parseFloat(max);
      filtered = projects.filter(project => {
        const projectEstimation = parseFloat(project.estimation);
        return projectEstimation >= minNum && projectEstimation <= maxNum;
      });
    }

    setFilteredProjects(filtered);
  };

  const filterProjectsByStatus = (status) => {
    return filteredProjects.filter(project => project.status === status);
  };
  const handleRowSelectionChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const getProjectManagers = (projects) => {
    const managers = projects.map(project => project.projectManager);
    return Array.from(new Set(managers));
  };

  const getResources = (projects) => {
    const resources = projects.flatMap(project => project.resources);
    return Array.from(new Set(resources));
  };

  const getProjectName = (projects) => {
    const projectNames = projects.map(project => project.projectName);
    return Array.from(new Set(projectNames));
  };


  return (
    <div>
      <div className="card shadow-lg">
      <div style={{ background: "#f7f9fc", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }} className="card-header">
            <h3 className="text-2xl font-semibold text-black-700">
                Projects 
                <Badge style={{ background: "#e9edf5", color: "#464f60", marginLeft: '10px' }} count={projects.length} />
            </h3>

            <div style={{ display: 'flex', alignItems: 'center',gap:10 }}>
                <Tooltip title="Notifications">
                    <Badge size='sm' count={5} style={{ marginRight: '5px',background:"#8a2be2",color:"#8a2be2" }}>
                        <FontAwesomeIcon icon={faBell} style={{ fontSize: '1.5rem', color: '#464f60' }} />
                    </Badge>
                </Tooltip>
                {" "}
                <Tooltip title="Settings">
                    <FontAwesomeIcon icon={faCog} style={{ fontSize: '1.5rem', color: '#464f60' }} />
                </Tooltip>
            </div>
        </div>
        <div className="card-body">
          <TopNavbar
            onFilterApply={onFilterApply}
            projectManagers={getProjectManagers(projects)}
            projectName={getProjectName(projects)}
            resources={getResources(projects)}
            onRowSelectionChange={handleRowSelectionChange}
          />
          <Tabs defaultActiveKey="1">
            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filteredProjects.length}>All</Badge>} key="1">
              <ProjectDashboardTable projects={filteredProjects} />
            </TabPane>

            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filterProjectsByStatus('At Risk').length}>Risk</Badge>} key="2">
              <ProjectDashboardTable projects={filterProjectsByStatus('At Risk')} />
            </TabPane>

            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filterProjectsByStatus('On Hold').length}>On hold</Badge>} key="3">
              <ProjectDashboardTable projects={filterProjectsByStatus('On Hold')} />
            </TabPane>

            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filterProjectsByStatus('On Track').length}>On track</Badge>} key="4">
              <ProjectDashboardTable projects={filterProjectsByStatus('On Track')} />
            </TabPane>

            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filterProjectsByStatus('Potential Risk').length}>Potential Risk</Badge>} key="5">
              <ProjectDashboardTable projects={filterProjectsByStatus('Potential Risk')} />
            </TabPane>

            <TabPane tab={<Badge style={{ background: "#e9edf5", color: "#464f60" }} className="pe-3" count={filterProjectsByStatus('Archived').length}>Archived</Badge>} key="6">
              <ProjectDashboardTable projects={filterProjectsByStatus('Archived')} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
