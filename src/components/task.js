import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './checkbox';
import Icon from './icon';

const Task = props => {
    return (
        <div className={`task ${props.status === 'done' ? 'done' : props.status === 'in progress' ? 'in_process' : 'not_done'}`}>
            <div className="left_side">
            <Checkbox onClick={() => props.changeStatus(props.id)} initiallyChecked={props.status === 'done' ? true : false}/>
            </div>
            <div className="task_name">
            <h3>{props.title}</h3>
            </div>
            <div className="right_side">
            <Icon name="edit" clickHandler={() => props.changeEditMode(props.id)}/>
            <Icon name="delete" clickHandler={() => props.deleteTask(props.id)}/>
            </div>
        </div>
    );
};

Task.propTypes = {
    title : PropTypes.string.isRequired,
    status : PropTypes.string,
    changeStatus : PropTypes.func.isRequired,
    changeEditMode : PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired
};

Task.defaultProps = {
    status : "not done"
}

export default Task;