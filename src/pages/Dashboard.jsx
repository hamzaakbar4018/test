import { getDashboardData } from '../APIS';
import Card from '../components/Card/Card'
import { Loader } from '../components/common/loader'
import useSWR from "swr";

const Dashboard = () => {
  const { data } = useSWR("/getDashboardData", () =>
    getDashboardData()
  );
  if (!data) return <Loader />;
  return (
    <>
    <h1 className='font-bold text-2xl'>Dashboard</h1>
    <div className='md:flex flex-wrap md:gap-y-10 gap-x-24'>
    
      {data.data.map((item) => (
        <Card key={item.label} title={item.label} price={item.value} />
      ))}
    </div>
    </>
  )
}

export default Dashboard