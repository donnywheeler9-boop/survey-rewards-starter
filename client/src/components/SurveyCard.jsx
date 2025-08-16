import React from 'react'

export default function SurveyCard({ survey, onComplete }) {
  return (
    <div className="border p-4 rounded shadow mb-4 bg-white">
      <h2 className="font-bold text-lg">{survey.title}</h2>
      <p className="text-gray-600">{survey.description}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => onComplete(survey.id)}
      >
        Complete Survey (+{survey.points} points)
      </button>
    </div>
  )
}
