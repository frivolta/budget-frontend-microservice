import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { setDeleteCategory } from '../../../redux/actions/categoryActions';
import Paper from "../../../components/grid/Paper";
import FlexGridContainer from "../../../components/grid/FlexGridContainer";
import { setIconPath } from '../../../util/setIconPath';
import ActionButtons from '../../../components/buttons/ActionButtons';

class ExpenseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteConfirmationIsClosed: false,
            category: {},
            categories: []
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.categoriesList.categories !== this.props.categoriesList.categories){
            this.expenseCategories(this.props.categoriesList.categories);
        }
    }

    //Not Pure Method
    expenseCategories = (items) => {
        let resultItem={}
        if(items && !_.isEmpty(items)){
            resultItem = items.filter((item)=>item.name===this.props.expense.category)
            resultItem=_.head(resultItem);
            this.setState({
                ...this.state,
                category: resultItem
            })
        }
    }        

    setCategories (categories){
        this.setState({
            categories
        })
    }

    handleToggleConfirmation = (_id) => {
        this.props.handleToggleConfirmation();
        this.props.setDeleteCategory(_id);
    };
    handleEditActivation = (_id) => {
        this.props.handleEditActivation(_id);
    }
    render() {
        const { _id, description, amount, date, type, beneficiary,icon, category } = this.props.expense;

        return (
            <React.Fragment>
                <Paper key={_id} className={`CategoryItem--container ${type}`}>
                    <FlexGridContainer type="flex-space-between" className="CategoryItem" size="100">
                        <div className="CategoryItem--icon">
                            {this.state.category.name}
                        </div>
                        <div className="CategoryItem--icon">
                            <p className="mt-2 mb-2 center darkColorAlt">{description}</p>
                            <p className="mt-2 mb-2 center darkColorAlt">{date}</p>
                            <p className="mt-2 mb-2 center darkColorAlt">{amount}</p>
                            <p className="mt-2 mb-2 center darkColorAlt">{category}</p>
                        </div>
                        <div className="CategoryItem--actions">
                            <ActionButtons type="editButton" onClick={() => this.handleEditActivation(_id)} />
                            <ActionButtons type="deleteButton" onClick={() => this.handleToggleConfirmation(_id)} />
                        </div>
                    </FlexGridContainer>
                </Paper>
            </React.Fragment>
        )
    }
}

ExpenseItem.propTypes = {
    item: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    setDeleteCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
}

export default connect(mapStateToProps, { setDeleteCategory })(ExpenseItem);