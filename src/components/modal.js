import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from './button';
import Icon from './icon';

export default class Modal extends React.Component{
    constructor(props){
        super();
        this.props = props;
        this.state = {
            status : false,
            taskTitle : ""
        };
        this.createNewTask = this.createNewTask.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeTaskTitle = this.changeTaskTitle.bind(this);
        this.neededHandler - this.neededHandler.bind(this);
    }

    componentWillMount(){
        this.div = document.createElement('div');
        document.body.appendChild(this.div);
    }

    componentDidMount(){
        this.refs.title.focus();
        this.refs.title.select();
    }

    componentWillUnmount(){
        document.body.removeChild(this.div);
    }

    changeStatus(){
        this.setState({
            status : !this.state.status
        });
    }

    changeTaskTitle(event){
        let taskTitle = event.target.value;
        this.setState({
            taskTitle
        });
    }

    createNewTask(){
        let title = this.state.taskTitle;
        let status = this.state.status ? "in progress" : "not done";
        this.props.createNewTask(status, title);
        this.props.closeModal();
    }

    editTask(){
        let obj = {
            title : this.state.taskTitle,
            status : this.state.status ? "in progress" : "not done"
        };
        this.props.editTask(obj);
    }

    neededHandler(){
        if(this.props.isEditing !== null){
            this.editTask();
        }else{
            this.createNewTask();
        }
    }

    render(){
        return ReactDOM.createPortal(
            <section className="modal">
                <div className="form">
                    <div className="close">
                        <Icon clickHandler={() => this.props.closeModal()} name="close"/>
                    </div>
                    <h2>{"Нове завдання"}</h2>
                    <input ref="title" defaultValue={this.props.isEditing !== null ? this.props.isEditing.title : ""} onChange={this.changeTaskTitle} type="text" placeholder="Назва завдання"/>
                    <div className="progress_checkbox">
                        <label htmlFor="in_process">Завдання в процесі</label>
                        <input onChange={this.changeStatus} type="checkbox" />
                    </div>
                    <Button clickHandler={() => this.neededHandler()} className="button_done" buttonName="Готово"/>
                </div>
            </section>,
            this.div
        );
    }
}

Modal.propTypes = {
    closeModal : PropTypes.func,
    createNewTask : PropTypes.func,
    editTask : PropTypes.func,
    isEditing : PropTypes.any
};