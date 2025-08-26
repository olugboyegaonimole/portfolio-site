import Link from 'next/link' 
import EnergyLineChart from '@/components/EnergyLineChart' 
import EnergyBreakdownChart from '@/components/EnergyBreakdownChart' 
import ForecastWidget from '@/components/ForecastWidget' 

export default function EnergyAnalyticsPage() { 
    return ( 
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12"> 
    <div className="max-w-5xl mx-auto space-y-12"> 
        {/* Header */} 
        <header className="text-center"> 
            <h1 className="text-4xl font-extrabold mb-2">⚡ Energy Consumption & Predictive Analytics</h1> 
            <p className="text-gray-400 max-w-3xl mx-auto text-lg"> A cost-optimized analytics platform for utility companies to monitor energy usage and forecast demand using IoT data, Firestore, and lightweight ML models. </p> 
            </header> 
            
        {/* Tech Stack */} 
        <section className="flex flex-wrap justify-center gap-3"> 
            {[ 'Google Cloud Functions', 'Firestore', 'Vertex AI (or TF.js/Prophet)', 'Next.js', 'TailwindCSS', 'Recharts' ].map((tech) => ( <span key={tech} className="bg-indigo-700 text-sm px-3 py-1 rounded-full font-medium" > {tech} </span> ))} 
            
        </section> 
        
        {/* Historical vs Predicted */} 
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg"> 
            <h2 className="text-2xl font-semibold mb-2">📈 Historical vs Predicted Demand</h2> 
            <p className="text-gray-400 mb-4"> Overlay actual consumption with forecasted values for proactive decision-making. </p> 
            <EnergyLineChart />   
        </section> 
        
        {/* Breakdown */} 
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg"> 
            <h2 className="text-2xl font-semibold mb-2">🔎 Demand Breakdown</h2> 
            <p className="text-gray-400 mb-4"> Average energy demand segmented by weekday or source type (solar, wind, coal). </p> 
            <EnergyBreakdownChart /> 
        </section> 
        
        {/* Forecast Widget */} 
        <section className="bg-gray-900 p-6 rounded-xl shadow-lg"> 
            <ForecastWidget /> 
        </section> 
        
        {/* Back link */} 
        <div className="text-center mt-12"> <Link href="/" className="text-indigo-400 underline hover:text-indigo-300"> ← Back to portfolio </Link> </div> 
    </div> 
        
    </main> ) 
    
}