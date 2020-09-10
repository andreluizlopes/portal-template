import dayjs from 'dayjs'

export const lastUpdated = () => {
  const timeZone = new Date().toLocaleDateString('en-US', { timeZone: 'America/Sao_Paulo' })
  return dayjs(timeZone).subtract(1, 'day').format('DD/MM/YYYY')
}
