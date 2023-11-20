import { useDispatch} from 'react-redux'
import { changeFilterAct } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      dispatch(changeFilterAct(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name='filter' onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter