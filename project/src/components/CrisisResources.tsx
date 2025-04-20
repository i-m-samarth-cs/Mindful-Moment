import React from 'react';
import { AlertCircle, Phone, MessageSquare } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Button from './ui/Button';

const CrisisResources: React.FC = () => {
  return (
    <Card className="border-l-4 border-red-500">
      <CardHeader>
        <div className="flex items-center">
          <AlertCircle size={20} className="text-red-500 mr-2" />
          <CardTitle>Crisis Resources</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700">
          If you're experiencing a mental health emergency, please reach out for immediate help:
        </p>
        
        <div className="space-y-2">
          <a 
            href="tel:988" 
            className="flex items-center p-3 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Phone className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <h3 className="font-medium">988 Suicide & Crisis Lifeline</h3>
              <p className="text-sm text-gray-600">Call or text 988 (24/7)</p>
            </div>
          </a>
          
          <a 
            href="sms:741741?body=HOME" 
            className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <h3 className="font-medium">Crisis Text Line</h3>
              <p className="text-sm text-gray-600">Text HOME to 741741 (24/7)</p>
            </div>
          </a>
        </div>
        
        <p className="text-sm text-gray-500 italic">
          These services are confidential and available 24/7 to anyone in emotional distress or suicidal crisis.
        </p>
      </CardContent>
    </Card>
  );
};

export default CrisisResources;