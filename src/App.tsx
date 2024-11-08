import { useReducer, useEffect, useMemo } from 'react'
import Form from "./components/Form"
import { activityReducer, initialState } from './reducers/activity-reducer'
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'
import './styles/pic.css'
import './styles/list.css'

function App() {

    const [state, dispatch] = useReducer(activityReducer, initialState)

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])
    
    return (
        <>


        
            <header className="bg-black py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-rigth pr-[100px] text-lg font-bold text-white uppercase">
                        macro counter 
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        disabled={!canRestartApp()}
                        onClick={() => dispatch({type: 'restart-app'})}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            <section className="pic">
                <div className="max-w-4xl mx-auto pt-[155px]">
                    <Form 
                    
                        dispatch={dispatch}
                        state={state}
                    />
                </div>
            </section>

            <section className='bg-black -800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker 
                        activities={state.activities}
                    />
                </div>
            </section>

            <section className="bg-black ">
                <ActivityList 
                    activities={state.activities}
                    dispatch={dispatch}
                />
            </section>
        </>
    )
}

export default App
