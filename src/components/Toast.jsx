const Toast = ({ type, message }) => {
  return (
    <>
      <div className="toast toast-bottom toast-end">
        <div
          className={
            type === 'good' ? 'alert alert-success' : 'alert alert-warning'
          }
        >
          <span>{message}</span>
        </div>
      </div>
    </>
  )
}

export default Toast
