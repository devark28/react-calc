import {useState, type JSX} from 'react'
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
const operators = [
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
    const [operands, setOperands] = useState<[number | null, number | null]>([null, null]);
    const [operator, setOperator] = useState<{
        op: string,
        label: string | JSX.Element,
        func: (a: number, b: number) => number,
        className: string
    } | null>(null);
    const [currentOperand, setCurrentOperand] = useState<{ index: 0 | 1, isDecimal: boolean, overwritable: boolean }>({
        index: 0,
        isDecimal: false,
        overwritable: false,
    });

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col w-100 h-156 bg-[#7A7B88]'>
                <div className='w-full h-18 py-4 px-3 text-5xl text-end outline-none text-white'>
                    {currentOperand.isDecimal && !(operands[currentOperand.index] ?? 0).toString().includes('.') ?
                        (operands[currentOperand.index] ?? 0).toString() + '.'
                        : operands[currentOperand.index] ?? 0}
                </div>
                <div className='grid grid-cols-4 grid-rows-5 h-full w-full bg-[#7A7B86] gap-[1px] text-3xl font-medium'>
                    <button className='bg-[#DBDBDB] order-1' onClick={() => {
                        setOperands([null, null]);
                        setCurrentOperand({index: 0, isDecimal: false, overwritable: false});
                        setOperator(null);
                        setOperator(null);
                    }}>AC
                    </button>
                    <button className='bg-[#DBDBDB] order-2' onClick={() => {
                        setOperands(oldOperands => {
                            const newOperands = [...oldOperands];
                            newOperands[currentOperand.index] = -1 * (operands[currentOperand.index] ?? 0);
                            return newOperands as [number | null, number | null];
                        });
                    }}>+/-
                    </button>
                    <button className='bg-[#DBDBDB] order-3' onClick={() => {
                        if (currentOperand.index != 0 && operator) {
                            setOperands([operator.func(...operands as [number, number]), null])
                            setCurrentOperand({index: 0, isDecimal: false, overwritable: true});
                            setOperator(null);
                        }
                        setOperands(oldOperands => {
                            const newOperands = [...oldOperands];
                            newOperands[currentOperand.index] = (operands[currentOperand.index] ?? 0) / 100;
                            return newOperands as [number | null, number | null];
                        });
                    }}>%
                    </button>
                    {operators.map(operator_ => (
                        <button key={operator_.op}
                                className={`bg-[#F38636] text-white fill-white flex justify-center items-center ${operator_.className}`}
                                onClick={() => {
                                    if (currentOperand.index != 0) {
                                        const result = operator_.func(...operands as [number, number]);
                                        setOperands([result, result /* keep the current value displayed */])
                                    }else{
                                        const result = operands[0] ?? 0;
                                        setOperands([result, result /* keep the current value displayed */])
                                    }
                                    setCurrentOperand({index: 1, isDecimal: false, overwritable: true});
                                    setOperator(operator_);
                                }}>{operator_.label}</button>
                    ))}
                    {numbers.map(num => (
                        <button key={num.value} className={`bg-[#DBDBDB] ${num.className}`} onClick={() => {
                            setOperands(oldOperands => {
                                const newOperands = [...oldOperands];
                                if (currentOperand.overwritable) {
                                    newOperands[currentOperand.index] = num.value;
                                    setCurrentOperand(old => ({...old, overwritable: false}))
                                } else {
                                    newOperands[currentOperand.index] =
                                        Number((newOperands[currentOperand.index] ?? 0).toString() +
                                            (currentOperand.isDecimal ? '.' : '') + num.value.toString());
                                }
                                return newOperands as [number | null, number | null];
                            });
                        }}>{num.value}</button>
                    ))}
                    <button className='bg-[#DBDBDB] order-18' onClick={() => {
                        setCurrentOperand(old => ({...old, isDecimal: !old.isDecimal}));
                    }}>.
                    </button>
                    <button className='bg-[#F38636] text-white order-19' onClick={() => {
                        if (currentOperand.index != 0 && operator) {
                            setOperands([operator.func(...operands as [number, number]), null])
                            setCurrentOperand({index: 0, isDecimal: false, overwritable: true});
                            setOperator(null);
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
