import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../features/theme/ThemeSlice'
import type { RootState } from '../store'

const Button = ({name}) => {
  const dispatch = useDispatch()
  return (
    <button
      onClick={() => dispatch(changeTheme(name))}
      className='bg-black text-white px-3 py-2 rounded hover:bg-slate-800'>
      {name}
    </button>
  )
}

export const ContainerButtons = () => {
  const themeValue = useSelector((state: RootState) => state.theme.theme)
  // console.log(themeValue)
  return (
    <div className="flex space-x-4 justify-center">
      <Button name="light" />
      <Button name="dark" />
      <Button name="system" />
    </div>
  )
}

