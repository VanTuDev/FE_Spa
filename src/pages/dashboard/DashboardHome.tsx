import { useEffect, useState } from 'react'
import tokenService from '../../services/tokenService'

const DashboardHome = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const user = tokenService.getUser()
    if (user) {
      setUserName(user.name || 'khách')
    }
  }, [])

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Chào mừng {userName}!
      </h1>
      <p className="text-gray-600">
        Chúc bạn một ngày làm việc hiệu quả
      </p>
    </div>
  )
}

export default DashboardHome 