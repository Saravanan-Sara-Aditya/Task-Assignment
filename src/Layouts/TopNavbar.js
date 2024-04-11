
import React, { useState } from 'react';
import { Button, Menu, Select, Dropdown, Input, Checkbox, Form, Tag, DatePicker, Modal } from 'antd';
import { faCaretDown, faFilter, faPlus, faTableCells, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MultiSelectOptions from '../Components/MultiSelectOptions';

const { Option } = Select;
const { Search } = Input;
const options = ['#', 'Project Name', 'PM', 'Status', 'Last Update', 'Resources', 'Project Timeline', 'Deadline', 'Estimated Amount'];

const TopNavbar = ({ onFilterApply, projectManagers = [], resources = [], filteredResultsCount }) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const [filterValue, setFilterValue] = useState(null);
    const [estimationRange, setEstimationRange] = useState({ min: '', max: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [customTimeline, setCustomTimeline] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleTimelineChange = (value) => {
        setCustomTimeline(value === 'custom');
    };
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    const handleApplyFilter = () => {
        if (filterType === 'Estimation') {
            onFilterApply(filterType, estimationRange);
        } else {
            onFilterApply(filterType, filterValue);
        }
    };

    const handleFilterTypeChange = (key) => {
        setFilterType(key);
        setFilterValue(null);
        setEstimationRange({ min: '', max: '' });
    };
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleNewProject = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleTableSettings = () => {
        setIsModalVisible1(true);
    };

    const handleModalCancel1 = () => {
        setIsModalVisible1(false);
    };

    const filtersApplied = filterType !== 'All' || filterValue !== null || estimationRange.min !== '' || estimationRange.max !== '';

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked);
    }
    const handleClearAll = () => {
        setFilterType('All');
        setFilterValue(null);
        setEstimationRange({ min: '', max: '' });
        onFilterApply(null, null);
    };

    const menu = (
        <Menu onClick={({ key }) => handleFilterTypeChange(key)}>
            <Menu.Item key="All">All</Menu.Item>
            <Menu.Item key="Project Name">Project Name</Menu.Item>
            <Menu.Item key="PM">PM</Menu.Item>
            <Menu.Item key="Estimation">Estimation</Menu.Item>
            <Menu.Item key="Resources">Resources</Menu.Item>
            <Button style={{ backgroundColor: "#4945c4", color: "#fff" }} onClick={handleApplyFilter}>
                Apply
            </Button>
        </Menu>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 16,
            paddingTop: 15,
            paddingLeft: 15,
            paddingRight: 15,
            gap: 10,
        }}>

            <Button onClick={handleTableSettings} icon={<FontAwesomeIcon icon={faTableCells} size="lg" />} />
            
            <Input.Group compact style={{ width: '100%' }}>
                <Dropdown style={{ width: '15%', cursor: "pointer" }} overlay={menu} placement="bottomLeft">
                    <Input
                        prefix={<FontAwesomeIcon icon={faFilter} style={{ color: '#464f60' }} />}
                        value={filterType}
                        readOnly
                        style={{ width: '15%', cursor: "pointer" }}
                        suffix={<FontAwesomeIcon icon={faCaretDown} />}
                    />
                </Dropdown>

                {filterType === 'Project Name' && (
                    <Search
                        className="search-bar"
                        placeholder={`Search by Project Name`}
                        allowClear
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        style={{ width: '30%' }}
                    />
                )}

                {filterType === 'PM' && (
                    <Select
                        mode="multiple"
                        placeholder="Select PM"
                        style={{ width: '30%' }}
                        onChange={setFilterValue}
                        value={filterValue}
                    >
                        {projectManagers.map((pm) => (
                            <Option key={pm} value={pm}>
                                {pm}
                            </Option>
                        ))}
                    </Select>
                )}

                {filterType === 'Estimation' && (
                    <Input.Group compact style={{ width: '85%' }}>
                        <Input
                            placeholder="Min"
                            style={{ width: '10%', borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
                            value={estimationRange.min}
                            onChange={(e) => setEstimationRange({ ...estimationRange, min: e.target.value })}
                        />
                        <Input
                            placeholder="Max"
                            style={{ width: '10%' }}
                            value={estimationRange.max}
                            onChange={(e) => setEstimationRange({ ...estimationRange, max: e.target.value })}
                        />
                    </Input.Group>
                )}

                {filterType === 'Resources' && (
                    <Select
                        mode="multiple"
                        placeholder="Select resources"
                        style={{ width: '30%' }}
                        onChange={setFilterValue}
                        value={filterValue}
                    >
                        {resources.map((resource) => (
                            <Option key={resource} value={resource}>
                                {resource}
                            </Option>
                        ))}
                    </Select>
                )}
            </Input.Group>

            {filtersApplied && (
                <Button
                    type='link'
                    onClick={handleClearAll}
                    style={{ marginLeft: 16, color: "#4945c4" }}
                >
                    Clear All
                </Button>
            )}

            <Button onClick={handleNewProject} style={{ background: "#8a2be2", color: "#fff" }}>
                <FontAwesomeIcon icon={faPlus} size="sm" style={{ color: "#ffffff", marginRight: "2px" }} />
                {" "} New Project
            </Button>
            {/*  */}
            {/*  */}
            <Modal title="New Project" visible={isModalVisible} onCancel={handleModalCancel}>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        timeline: 'default',
                    }}
                >
                    <Form.Item
                        label="Project Name"
                        name="projectName"
                        rules={[{ required: true, message: 'Please enter project name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Project Manager"
                        name="projectManager"
                        rules={[{ required: true, message: 'Please select project manager' }]}
                    >

                        <div class="radio-switch">
                            <input type="radio" id="option1" name="options" checked />
                            <label for="option1">Option 1</label>
                            <input type="radio" id="option2" name="options" />
                            <label for="option2">Option 2</label>
                            <input type="radio" id="option3" name="options" />
                            <label for="option3">Option 3</label>
                        </div>

                    </Form.Item>

                    <Form.Item
                        label="Resources"
                        name="resources"
                        rules={[{ required: true, message: 'Please select resources' }]}
                    >
                        <MultiSelectOptions />
                    </Form.Item>

                    <Form.Item label="Project Timeline" name="timeline">
                        <Select onChange={handleTimelineChange}>
                            <Option value="default">Default</Option>
                            <Option value="15 Days">15 Days</Option>
                            <Option value="30 Days">30 Days</Option>
                            <Option value="48 Days">48 Days</Option>
                            <Option value="60 Days">60 Days</Option>
                            <Option value="custom">Custom</Option>
                        </Select>
                    </Form.Item>

                    {customTimeline && (
                        <>
                            <Form.Item
                                label="From"
                                name="fromDate"
                                rules={[{ required: true, message: 'Please select start date' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label="To"
                                name="toDate"
                                rules={[{ required: true, message: 'Please select end date' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item
                        label="Estimation (USD)"
                        name="estimation"
                        rules={[{ required: true, message: 'Please enter estimation in USD' }]}
                    >
                        <Input type="number" prefix="$" />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ background: "#4945c4" }} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/*  */}
            <Modal title="Table Settings" visible={isModalVisible1} onCancel={handleModalCancel1}>
                <Form.Item
                    label="Table Columns"
                    name="tablecolumns"
                >
                    <div>
                        {options.map((option) => (
                            <>
                                <Tag

                                    key={option}
                                    color={selectedOptions.includes(option) ? 'blue' : ''}
                                    style={{
                                        cursor: 'pointer',
                                        marginBottom: '5px',
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "2px",
                                        paddingBottom: "2px",
                                        border: selectedOptions.includes(option) ? 'none' : '1px solid #c9ccce',
                                        backgroundColor: selectedOptions.includes(option) ? '#4945c4' : '#f3f3f3',
                                        color: selectedOptions.includes(option) ? 'white' : '#464f60'
                                    }}
                                    onClick={() => toggleOption(option)}
                                >
                                    {option}
                                </Tag>
                            </>
                        ))}
                    </div>
                </Form.Item>
                <Form.Item
                    label="Column Order"
                    name="tablecolumns"
                // rules={[{ required: true, message: 'Please select resources' }]}
                >
                    <div style={{ background: "#eee", borderRadius: "10px", paddingTop: "5px", paddingLeft: "7px", paddingBottom: "0px", display: "inline-block" }}>
                        {options.map((option) => (
                            <Tag

                                key={option}

                                style={{
                                    cursor: 'pointer',
                                    marginBottom: '5px',
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingTop: "2px",
                                    paddingBottom: "2px",
                                    border: '0.5px solid #fefefe',
                                    fontWeight: "600",
                                    backgroundColor: '#ffffff',
                                    color: '#4945c4'
                                }}

                            >
                                {option}
                            </Tag>
                        ))}
                    </div>
                </Form.Item>
                <div>

                </div>
                <Form.Item
                    label="Amount"
                    name="amount"
                    className='mb-0'
                >
                </Form.Item>
                <div className='mb-3'>
                    <div class="radio-switch">
                        <input type="radio" id="option1" name="options" checked />
                        <label for="option1">10,500</label>
                        <input type="radio" id="option2" name="options" />
                        <label for="option2">10.5K</label>
                    </div>
                </div>
                <Form.Item
                    label="Date formate"
                    name="Date"
                    className='mb-0'

                >
                </Form.Item>
                <div>
                    <div class="radio-switch">
                        <input type="radio" id="opt1" name="options1" checked />
                        <label for="opt1">DD/MM/YYYY</label>
                        <input type="radio" id="opt2" name="options1" />
                        <label for="opt2">MM/DD/YYYY</label>
                        <input type="radio" id="opt3" name="options1" />
                        <label for="opt3">DD/MMM/YYYY</label>
                    </div>
                </div>
                <label className='fw-semibold mt-3'>
                    <Checkbox
                        className="ant-checkbox ant-checkbox-inner ant-checkbox-wrapper"
                        checked={checked}
                        onChange={handleCheckboxChange}
                    >
                        {/* The label text */}
                        <span style={{ fontWeight: "600" }}>Sticky Header</span>
                    </Checkbox>
                </label>
                <div class="modal-footer"><button type="button" class="ant-btn css-dev-only-do-not-override-1kuana8 ant-btn-default"><span>Reset</span></button><button style={{ background: "#4945c4" }} type="button" class="ant-btn text-white css-dev-only-do-not-override-1kuana8 "><span>Apply</span></button></div>
            </Modal>
        </div>
    );
};

export default TopNavbar;
