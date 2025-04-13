import mongoose, { Document, Model, Schema } from 'mongoose';

// Interfaces for the Course document
interface ILesson {
  title: string;
  type: 'video' | 'text' | 'quiz';
  content: string;
  duration?: number; // in minutes
  order: number;
}

interface ISection {
  title: string;
  lessons: ILesson[];
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  thumbnailUrl?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  instructorId: mongoose.Types.ObjectId;
  sections: ISection[];
  enrolledStudents: number;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Schema for lessons
const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['video', 'text', 'quiz'], 
    default: 'video' 
  },
  content: { type: String, required: true },
  duration: { type: Number },
  order: { type: Number, required: true, default: 0 }
});

// Schema for sections
const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  lessons: [lessonSchema],
  order: { type: Number, required: true, default: 0 }
});

// Schema for the course
const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    thumbnailUrl: { type: String },
    level: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'advanced'], 
      default: 'beginner' 
    },
    category: { type: String, required: true },
    tags: [{ type: String }],
    status: { 
      type: String, 
      enum: ['draft', 'published', 'archived'], 
      default: 'draft' 
    },
    instructorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    sections: [sectionSchema],
    enrolledStudents: { type: Number, default: 0 },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    }
  },
  { 
    timestamps: true,
    versionKey: false 
  }
);

// Create indexes for better performance
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ instructorId: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ price: 1 });

// Check if the model already exists before creating it
const Course = (mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema)) as Model<ICourse>;

export default Course; 