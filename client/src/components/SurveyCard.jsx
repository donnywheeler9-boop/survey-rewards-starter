// client/src/components/SurveyCard.jsx
import React from 'react'

export default function SurveyCard({ survey, onComplete }) {
  const disabled = survey.completed
  return (
    <div className="border p-5 rounded-2xl shadow bg-gray-800 text-gray-100 flex items-start justify-between">
      <div>
        <h3 className="font-bold text-xl">{survey.title}</h3>
        <p className="text-gray-400 mt-1">{survey.description}</p>
        <p className="mt-2 text-sm text-gray-300">
          Reward: <span className="text-purple-300 font-semibold">+{survey.points}</span> points
        </p>
        {disabled && <p className="mt-1 text-green-400 text-sm">Completed ✔</p>}
      </div>
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition
          ${disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
        `}
        disabled={disabled}
        onClick={() => onComplete(survey.id)}
        title={disabled ? 'Already completed' : 'Complete survey'}
      >
        {disabled ? 'Done' : 'Complete'}
      </button>
    </div>
  )
}
