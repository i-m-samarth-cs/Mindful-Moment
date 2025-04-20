import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Container from '../components/ui/Container';
import ResourceCard from '../components/ResourceCard';
import CrisisResources from '../components/CrisisResources';
import { Resource } from '../types';
import { resources } from '../data/resources';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Resource['category'] | 'all'>('all');
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories: { value: Resource['category'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All Resources' },
    { value: 'crisis', label: 'Crisis Support' },
    { value: 'professional', label: 'Professional Help' },
    { value: 'self-help', label: 'Self-Help Tools' },
    { value: 'community', label: 'Community Support' }
  ];
  
  return (
    <div className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mental Health Resources</h1>
          <p className="text-gray-600">
            Find professional help, self-help tools, and support resources for your mental health journey.
          </p>
        </div>
        
        <div className="mb-8">
          <CrisisResources />
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex-shrink-0">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Resource['category'] | 'all')}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">
              No resources found matching your criteria. Try adjusting your search or category filter.
            </p>
          </div>
        )}
        
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            The resources provided on this page are for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-gray-700">
            Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default ResourcesPage;