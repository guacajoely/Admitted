﻿using Admitted.Models;
using Admitted.Utils;

namespace Admitted.Repositories
{
    public class UserRepo : BaseRepo, IUserRepo
    {
        public UserRepo(IConfiguration configuration) : base(configuration) { }


        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, FullName, Email
                          FROM [User]
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FullName = DbUtils.GetString(reader, "FullName"),
                            Email = DbUtils.GetString(reader, "Email"),
    
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }


        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FullName, Email)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FullName, @Email)";

                    DbUtils.AddParameter(cmd, "@FullName", user.FullName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



    }
}
