package course.controller;

import course.model.Course;
import course.model.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

@Controller
public class DefaultController {

    @Autowired
    CourseRepository courseRepository;

    @RequestMapping("/")
    public String index(Model model){

        Iterable<Course> courseIterable = courseRepository.findAll();
        ArrayList<Course> courseList = new ArrayList<>();

        for(Course f : courseIterable){
            courseList.add(f);
        }
        model.addAttribute("courseList", courseList);

        return "index";
    }

}
