import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export default class SimpleSelect extends React.Component {

  constructor(props){
    super(props)
    this.props=props
  }
  render() {
    return (
      <form id={'selecter'} autoComplete="off">
        <FormControl className={'SimpleSelect'}>
          <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
          <Select
            value={this.props.selected}
            onChange={this.props.handleChange}
            input={<Input name="age" id={this.props.id} />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.list.map((item,ind)=><MenuItem key={ind} value={item.value}>{item.label}</MenuItem>)}
          </Select>
        </FormControl>
      </form>
    );
  }
}