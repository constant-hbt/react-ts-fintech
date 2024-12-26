import React from 'react'
import { useData } from '../Context/DataContext';
import GraficoVendas from '../Components/GraficoVendas';

const Resumo = () => {

  const { data } = useData();

  if (!data)
    return null;

  const valorTotal = data
                      .reduce((acc, item) => acc + item.preco, 0)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const valorRecebido = data
                          .filter(item => item.status === 'pago')
                          .reduce((acc, item) => acc + item.preco, 0)
                          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const valorProcessando = data
                            .filter(item => item.status === 'processando')
                            .reduce((acc, item) => acc + item.preco, 0)
                            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <section>
      <div className='resumo flex mb'>
        <div className='box'>
          <div>
            <h2>Vendas</h2>
            <span>{valorTotal}</span>
          </div>
        </div>
        <div className='box'>
          <div>
            <h2>Recebido</h2>
            <span>{valorRecebido}</span>
          </div>
        </div>
        <div className='box'>
          <div>
            <h2>Processando</h2>
            <span>{valorProcessando}</span>
          </div>
        </div>
      </div>
      <div className='box mb'>
        <GraficoVendas data={data}/>
      </div>
    </section>
  )
}

export default Resumo;