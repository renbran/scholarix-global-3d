import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

// Sample destination data - replace with actual data from your website
const destinations = [
  {
    id: 1,
    country: 'United States',
    description: 'World-renowned universities and diverse study options',
    universities: ['Harvard University', 'MIT', 'Stanford University'],
    imageUrl: '/images/usa.jpg'
  },
  {
    id: 2,
    country: 'United Kingdom',
    description: 'Historic institutions with cutting-edge research',
    universities: ['Oxford University', 'Cambridge University', 'Imperial College London'],
    imageUrl: '/images/uk.jpg'
  },
  {
    id: 3,
    country: 'Canada',
    description: 'High quality education with excellent quality of life',
    universities: ['University of Toronto', 'McGill University', 'University of British Columbia'],
    imageUrl: '/images/canada.jpg'
  },
  // Add more destinations as needed
]

export function StudyDestinations() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Study Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card key={destination.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{destination.country}</CardTitle>
              <CardDescription>{destination.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Top Universities:</h3>
              <ul className="list-disc list-inside">
                {destination.universities.map((university) => (
                  <li key={university}>{university}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudyDestinations