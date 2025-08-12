
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from "sonner";

const CropForm = () => {
  const [cropName, setCropName] = useState('');
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [sowingDate, setSowingDate] = useState<Date | undefined>(undefined);
  const [harvestDate, setHarvestDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !cropType || !quantity || !sowingDate || !harvestDate) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Crop record added successfully');
      // Generate random blockchain hash
      const blockchainHash = Array(64).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      console.log('Generated hash:', blockchainHash);
      
      // Reset form
      setCropName('');
      setCropType('');
      setQuantity('');
      setUnit('kg');
      setSowingDate(undefined);
      setHarvestDate(undefined);
      setNotes('');
      setFiles(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Add New Crop Record</CardTitle>
        <CardDescription>
          Enter details about the crop you're planting or harvesting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop-name">Crop Name *</Label>
              <Input
                id="crop-name"
                placeholder="e.g. Rice, Wheat, Corn"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type *</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger id="crop-type">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grain">Grain</SelectItem>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="fruit">Fruit</SelectItem>
                  <SelectItem value="pulse">Pulse</SelectItem>
                  <SelectItem value="oilseed">Oilseed</SelectItem>
                  <SelectItem value="cash-crop">Cash Crop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <div className="flex space-x-2">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g. 500"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="flex-1"
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ton">ton</SelectItem>
                    <SelectItem value="lb">lb</SelectItem>
                    <SelectItem value="units">units</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sowing-date">Sowing Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {sowingDate ? format(sowingDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={sowingDate}
                    onSelect={setSowingDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="harvest-date">Expected Harvest Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {harvestDate ? format(harvestDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={harvestDate}
                    onSelect={setHarvestDate}
                    initialFocus
                    disabled={(date) => 
                      sowingDate ? date < sowingDate : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional information about this crop"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label>Upload Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <UploadCloud className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-agri-green-600">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload fertilizer usage, pesticide records, or certifications (PDF, PNG, JPG)
                  </p>
                </Label>
                {files && files.length > 0 && (
                  <div className="mt-4 text-sm text-left">
                    <p className="font-medium text-gray-700">Selected files:</p>
                    <ul className="list-disc ml-5 mt-1 text-gray-600">
                      {Array.from(files).map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => {
          // Reset form
          setCropName('');
          setCropType('');
          setQuantity('');
          setUnit('kg');
          setSowingDate(undefined);
          setHarvestDate(undefined);
          setNotes('');
          setFiles(null);
        }}>
          Reset
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-agri-green-600 hover:bg-agri-green-700"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : 'Submit Crop Record'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CropForm;
