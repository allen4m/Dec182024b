import React from 'react';
import { X } from 'lucide-react';
import { CourseEntry } from '../types';
import { GradeSystem } from '../lib/airtable';
import { validateCredits, validateGrade } from '../lib/validation';

type CourseTableProps = {
  courses: CourseEntry[];
  gradingSystem?: GradeSystem[];
  selectedMode?: string;
  onUpdateCourse: (index: number, field: keyof CourseEntry, value: string) => void;
  onRemoveCourse: (index: number) => void;
};

export default function CourseTable({
  courses,
  gradingSystem,
  selectedMode,
  onUpdateCourse,
  onRemoveCourse
}: CourseTableProps) {
  const getGradePlaceholder = (system?: GradeSystem[], mode?: string) => {
    if (!system?.length) return 'Select country first';
    
    const filteredSystem = mode
      ? system.filter(g => g.grading_mode === mode)
      : system;
    
    if (!filteredSystem.length) {
      return 'Select grading mode';
    }

    // Check if all grades in the system have the same min and max
    const allSameRange = filteredSystem.every(g => g.grade_range_min === g.grade_range_max);
    const hasLetterGrades = filteredSystem.some(g => g.us_grade_letter);

    if (allSameRange && hasLetterGrades) {
      return 'Enter grade A-F';
    }

    const min = Math.min(...filteredSystem.map(g => g.grade_range_min));
    const max = Math.max(...filteredSystem.map(g => g.grade_range_max));
    
    return `Enter grade (${min.toFixed(2)}-${max.toFixed(2)})`;
  };

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Course Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Credit</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Grade</th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {courses.map((course, index) => {
                const creditError = validateCredits(course.credits);
                const gradeError = validateGrade(course.grade, gradingSystem || []);

                return (
                  <tr key={course.id}>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={course.course}
                        onChange={(e) => onUpdateCourse(index, 'course', e.target.value)}
                        placeholder="Enter course name"
                        className="w-full p-2 border-0 focus:ring-0 min-h-[44px]"
                        required
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={course.credits}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || /^\d*\.?\d*$/.test(value)) {
                              onUpdateCourse(index, 'credits', value);
                            }
                          }}
                          placeholder="1, 1.5, 2, etc."
                          className={`w-full p-2 border-0 focus:ring-0 min-h-[44px] ${
                            creditError && course.credits ? 'text-red-600' : ''
                          }`}
                          required
                        />
                        {creditError && course.credits && (
                          <div className="absolute left-0 -bottom-5 text-xs text-red-600">
                            {creditError}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={course.grade}
                          onChange={(e) => onUpdateCourse(index, 'grade', e.target.value)}
                          placeholder={getGradePlaceholder(gradingSystem, selectedMode)}
                          className={`w-full p-2 border-0 focus:ring-0 min-h-[44px] ${
                            gradeError && course.grade ? 'text-red-600' : ''
                          }`}
                          required
                        />
                        {gradeError && course.grade && (
                          <div className="absolute left-0 -bottom-5 text-xs text-red-600">
                            {gradeError}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onRemoveCourse(index)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Remove course"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}