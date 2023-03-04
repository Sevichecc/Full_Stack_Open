const Notification = ({ info }) => {
  if (!info.message)
    return null

  const style = {
    color: info.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div style={style}>
      <p>{info.message}</p>
    </div>
  )
}

export default Notification
