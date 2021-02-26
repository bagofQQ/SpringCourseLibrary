package course.controller;

import course.model.Course;
import course.model.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class CoursesController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/course/")
    public List<Course> list(){
        Iterable<Course> coursesIterable = courseRepository.findAll();
        ArrayList<Course> courses = new ArrayList<>();
        for (Course course: coursesIterable){
            courses.add(course);
        }
        return courses;
    }

    @GetMapping("/course/{id}")
    public ResponseEntity getCourse(@PathVariable int id){
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()){
            return new ResponseEntity(optionalCourse.get(), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/course/")
    public int add(Course course){
        Course newCourse = courseRepository.save(course);
        return newCourse.getId();
    }

    @PutMapping("/course/")
    public int put(Course course){
        int id = course.getId();
        Optional<Course> optionalCourse = courseRepository.findById(id);
        optionalCourse.get().setName(course.getName());
        Course newCourse = courseRepository.save(optionalCourse.get());
        return newCourse.getId();
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity deleteCourse(@PathVariable int id){
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()){
            courseRepository.delete(optionalCourse.get());
            return new ResponseEntity(HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @DeleteMapping("/course/")
    public ResponseEntity deleteCourses(){
        courseRepository.deleteAll();
        return new ResponseEntity(HttpStatus.OK);
    }

}
