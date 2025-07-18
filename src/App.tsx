import {useState} from 'react'
import DivideIcon from './components/divide.tsx';

const numbers = [
    {value: 0, className: 'col-span-2 order-17'},
    {value: 1, className: 'order-13'},
    {value: 2, className: 'order-14'},
    {value: 3, className: 'order-15'},
    {value: 4, className: 'order-9'},
    {value: 5, className: 'order-10'},
    {value: 6, className: 'order-11'},
    {value: 7, className: 'order-5'},
    {value: 8, className: 'order-6'},
    {value: 9, className: 'order-7'}
];
const operations = [
    {op: '+', label: '+', func: (a: number, b: number) => a + b, className: 'order-16'},
    {op: '-', label: '-', func: (a: number, b: number) => a - b, className: 'order-12'},
    {
        op: '/',
        label: <DivideIcon className='w-4 aspect-square'/>,
        func: (a: number, b: number) => a / b,
        className: 'order-4'
    },
    {op: '*', label: 'x', func: (a: number, b: number) => a * b, className: 'order-8'},
];

function App() {
    const [[left, right], setOperands] = useState<[number | null, number | null]>([null, null]);
    const [operator, setOperator] = useState<{
        op: string
        func: (a: number, b: number) => number
    } | null>(null);
    const [{num: value, isDecimal}, setValue] = useState<{ num: number, isDecimal: boolean }>({
        num: 0,
        isDecimal: false
    });
    const [valueStored, setValueStored] = useState<boolean>(false);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col w-100 h-156 bg-[#7A7B88]'>
                <input value={value} onChange={(e) => {
                    if (!Number.isNaN(Number(e.target.value))) {
                        setValue(old => ({...old, num: Number(e.target.value)}));
                    }
                }} autoFocus hidden disabled/>
                <div className='w-full h-18 py-4 px-3 text-5xl text-end outline-none text-white'>
                    {isDecimal && !value.toString().includes('.') ? value.toString() + '.' : value}
                </div>
                <div className='grid grid-cols-4 grid-rows-5 h-full w-full bg-[#7A7B86] gap-[1px] text-3xl font-medium'>
                    <button className='bg-[#DBDBDB] order-1' onClick={() => {
                        setValue({num: 0, isDecimal: false});
                        setOperands([null, null]);
                        setOperator(null);
                        setValueStored(false);
                    }}>AC
                    </button>
                    <button className='bg-[#DBDBDB] order-2' onClick={() => {
                        setValue(val => ({...val, num: -1 * val.num}))
                        if(operator == null && right == null) {
                            setOperands([-1 * value, right]);
                        }
                    }}>+/-
                    </button>
                    <button className='bg-[#DBDBDB] order-3' onClick={() => {
                        setValue(val => ({num: 100 * val.num, isDecimal: false}))
                        if(operator == null && right == null) {
                            setOperands([100 * value, right]);
                        }
                    }}>%
                    </button>
                    {operations.map(operation => (
                        <button key={operation.op}
                                className={`bg-[#F38636] text-white fill-white flex justify-center items-center ${operation.className}`}
                                onClick={() => {
                                    if (left == null) {
                                        setOperands([value, null]);
                                        setValueStored(true);
                                    } else if (right == null && operator != null && !valueStored) {
                                        setOperands([operation.func(left, value), null]);
                                        setValueStored(true);
                                    }
                                    setOperator(operation);
                                }}>{operation.label}</button>
                    ))}
                    {numbers.map(num => (
                        <button key={num.value} className={`bg-[#DBDBDB] ${num.className}`} onClick={() => {
                            setValue(val => {
                                if (valueStored) {
                                    setValueStored(false);
                                    return {isDecimal: false, num: num.value}
                                }
                                return {
                                    ...val,
                                    num: Number(val.num.toString() + (val.isDecimal ? '.' : '') + num.value.toString())
                                }
                            })
                        }}>{num.value}</button>
                    ))}
                    <button className='bg-[#DBDBDB] order-18' onClick={() => {
                        setValue(old => ({...old, isDecimal: !old.isDecimal}));
                    }}>.
                    </button>
                    <button className='bg-[#F38636] text-white order-19' onClick={() => {
                        if (left !== null && right == null && operator != null && !valueStored) {
                            setValue(old => ({...old, num: operator.func(left, value)}));
                            setOperands([operator.func(left, value), null]);
                            setOperator(null);
                            setValueStored(true);
                        } else if (left !== null && right !== null && operator != null) {
                            setValue(old => ({...old, num: operator.func(left, value)}));
                            setOperands([operator.func(left, value), null]);
                            setOperator(null);
                            setValueStored(true);
                        }
                    }}>=
                    </button>
                    {/*<div>{left ?? 'null'} {operator ? operator.op : 'null'} {right ?? 'null'}</div>*/}
                </div>
            </div>
        </div>
    )
}

export default App
