import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IVenda } from '../Context/DataContext';

const dadosGrafico = [
  {
    data: '2024-12-05',
    pago: 3000,
    processando: 500,
    falha: 100
  },
  {
    data: '2024-12-06',
    pago: 600,
    processando: 200,
    falha: 170
  },
  {
    data: '2024-12-07',
    pago: 50000,
    processando: 900,
    falha: 380
  },
];

type IVendaDia = {
  data: string;
  pago: number;
  processando: number;
  falha: number;
}

function transformData(data: IVenda[]): IVendaDia[]{

  const dias = data.reduce((acc: { [key: string]: IVendaDia }, item) => {
    const dia = item.data.split(' ')[0];
    
    if (!acc[dia]){
      acc[dia] = {
        data: dia,
        pago: 0,
        processando: 0,
        falha: 0
      };
    }
    
    acc[dia][item.status] += item.preco;

    return acc;
  }, {});

  return Object.values(dias);
}

const GraficoVendas = ({ data }: { data: IVenda[] }) => {

  const transformedData = transformData(data);

  return (
    <ResponsiveContainer height={400} width={'99%'}>
      <LineChart width={400} height={400} data={transformedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="data" />
        <YAxis/>
        <Tooltip />
        <Legend/>
        {/* <CartesianGrid stroke="#f5f5f5" /> */}
        <Line type="monotone" dataKey="pago" stroke="#ff7300" strokeWidth={3}/>
        <Line type="monotone" dataKey="processando" stroke="#FBCB21" strokeWidth={3}/>
        <Line type="monotone" dataKey="falha" stroke="#000000" strokeWidth={3}/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default GraficoVendas