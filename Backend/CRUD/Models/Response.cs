namespace CRUD.Models
{
    public class Response
    {
        public bool Success { get; set; }   

        public List<State> Data { get; set; }  

        public int Status { get; set; } 
    }
}
