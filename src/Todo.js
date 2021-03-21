import { ListItemText,List,ListItem,Button,Modal , Input} from '@material-ui/core'
import React , {useState}from 'react';
import './Todo.css'
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme)=>({
    paper:{
        position:'absolute',
        width:400,
        backgroundColor:theme.palette.background.paper,
        border:'2px solid #000',
        boxShadow:theme.shadows[5],
        padding:theme.spacing(2,4,3),
    }
}))

function Todo(props) {
    const classes = useStyles();
    const [open , setOpen] = useState(false)
    const [input , setInput] = useState()
    
    const handleOpen = (event)=>{
        setOpen(true);
    };
    const updateTodo = ()=>{
        db.collection('Todos').doc(props.todo.id).set({
            todo:`${input}`
        },{merge:true});
        console.log(input);
        setInput('');
        setOpen(false);
    };
    return (
        <div>
            <Modal
            
            open={open}
            onClose={e=>setOpen(false)}
  
          >
              <div className={classes.paper}>
                  <input placeholder={props.todo.todo} value={input} onChange={event=>{setInput(event.target.value);}} />
                  <Button onClick ={updateTodo}>Update</Button>
              </div>
          </Modal>
          <List className='Todo_list'>
              <ListItem>
                  <ListItemText primary={props.todo.todo} secondary="Todo"/>
              </ListItem>
              <Button onClick={e=>setOpen(true)}>Edit</Button>
              <DeleteForeverIcon onClick={event=>{db.collection('Todos').doc(props.todo.id).delete()}} />
          </List>
           
        </div>
    )
}

export default Todo
