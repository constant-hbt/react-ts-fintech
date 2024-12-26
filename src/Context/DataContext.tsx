import React from "react";
import useFetch from "../Hooks/useFetch";

type IVenda = {
  id: string;
  nome: string;
  preco: number;
  status: 'pago' | 'processando' | 'falha';
  pagamento: 'boleto' | 'cartao' | 'pix';
  parcelas: number | null;
  data: string;
}

type IDataContext = {
  data: IVenda[] | null;
  loading: boolean;
  error: string | null;
  inicio: string;
  final: string;
  setInicio: React.Dispatch<React.SetStateAction<string>>;
  setFinal: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = React.createContext<IDataContext | null>(null);

export const useData = () => {

  const context = React.useContext(DataContext);

  if (context === null) {
    throw new Error('useData deve estar dentro de um DataContextProvider');
  }

  return context;
}

function getDate(n?: number){
  const date = new Date();

  if (n)
    date.setDate(date.getDate() - Math.abs(n));

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

getDate(30);

export const DataContextProvider = ({children}: React.PropsWithChildren) => {

  const [inicio, setInicio] = React.useState(getDate(30));
  const [final, setFinal] = React.useState(getDate());

  const { data, loading, error } = useFetch<IVenda[]>(
    `https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`
  );

  return (
    <DataContext.Provider value={{ data, loading, error, inicio, setInicio, final, setFinal }}>
      {children}
    </DataContext.Provider>
  );
}